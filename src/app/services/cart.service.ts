import { Injectable } from '@angular/core';
import { Cart } from '../models/cart';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cart: Cart;

  constructor() {
    if(!this.cart) {
      this.resetCart();
    }
  }

  resetCart() {
    this.cart = new Cart();
  }

  addItemToCart(product: Product, nb: number) {
    this.cart.addToCart(product, nb);
  }

  removeItemToCart(product: Product, nb: number) {
    
  }

}
