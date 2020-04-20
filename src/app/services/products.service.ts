import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(
    private firestore: AngularFirestore
    ) { }

  getProducts() {
    return this.firestore.collection('products').snapshotChanges();
  }

  createProduct(product: Product) {
    return this.firestore.collection('products').add(product);
  }

  updateProduct(product: Product) {
    return this.firestore.doc(`products/${product.id}`).update(product);
  }

  deleteProduct(product: Product) {
    this.firestore.doc(`products/${product.id}`).delete();
  }
}
