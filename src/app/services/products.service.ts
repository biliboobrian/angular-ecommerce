import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentChangeAction } from '@angular/fire/firestore';
import { Product } from '../models/product';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(
    private firestore: AngularFirestore
    ) { }

  getProducts(inHome: boolean) {
    return this.firestore.collection<Product>('Products', ref => {
      if(inHome) {
        return ref.where('onHome', '==', inHome);
      } else {
        return ref;
      }

    }).snapshotChanges().pipe(
      map((res: DocumentChangeAction<Product>[]) => {
        const products: Product[] = [];
        res.forEach((result: DocumentChangeAction<Product>) => {
          const data = result.payload.doc.data();
          products.push({
            id: result.payload.doc.id,
            ...data
          })
        })
        return products;
      })
    );
  }

  getProduct(id: string) {
    return this.firestore.doc<Product>(`Products/${id}`).snapshotChanges().pipe(
      map(result => {
        const product: Product = {
          id: result.payload.id,
          ...result.payload.data()
        } as Product;
        return product;
      })
    );
  }

  createProduct(product: Product) {
    return this.firestore.collection<Product>('Products').add({ ...product });
  }

  updateProduct(product: Product) {
    return this.firestore.doc<Product>(`Products/${product.id}`).update(product);
  }

  deleteProduct(id: string) {
    this.firestore.doc<Product>(`Products/${id}`).delete();
  }
}
