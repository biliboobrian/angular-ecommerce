import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentChangeAction } from '@angular/fire/firestore';
import { Product } from '../models/product';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private obs: Observable<Product[]>;

  constructor(
    private firestore: AngularFirestore
    ) { }

  getProducts(): Observable<Product[]> {

    if(!this.obs) {
      this.obs = new Observable<Product[]>(observer => {
        this.firestore.collection<Product>('products').snapshotChanges().pipe(
          map((res: DocumentChangeAction<Product>[]) => {
            const products: Product[] = [];
            
            res.forEach((result: DocumentChangeAction<Product>) => {
              const data = result.payload.doc.data();
              products.push({
                id: result.payload.doc.id,
                ...data
              })
            });

            return products;
          })
        ).subscribe(products => {
          observer.next(products);
        });
      });
    } 
    return this.obs;
  }

  createProduct(product: Product) {
    return this.firestore.collection<Product>('products').add({ ...product });
  }

  updateProduct(product: Product) {
    return this.firestore.doc<Product>(`products/${product.id}`).update(product);
  }

  deleteProduct(id: string) {
    this.firestore.doc<Product>(`products/${id}`).delete();
  }
}
