import { Injectable } from '@angular/core';
import { Cart } from '../models/cart';
import { Product } from '../models/product';
import { ConfigService } from './config.service';
import { CartItem } from '../models/cart-item';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cart: Cart;

  constructor(
    private configService: ConfigService
  ) {
    this.loadCart();
  }

  loadCart() {
    this.loadLocal();
    if (!this.cart) {
      this.cart = new Cart();
    }
  }

  emptyCart() {
    this.cart = new Cart();
  }

  addItemToCart(product: Product, nb: number) {
    this.cart.addToCart(product, nb);
    this.saveLocal();
  }

  removeItemToCart(cartItem: CartItem) {
    this.cart.removeFromCart(cartItem);
    this.saveLocal();
  }

  saveLocal() {
    this.configService.getConfig().subscribe(data => {
      localStorage.setItem(
        this.configService.config.id + '_cart',
        JSON.stringify(this.cart)
      );
    });
  }

  loadLocal() {
    this.configService.getConfig().subscribe(data => {
      this.cart = new Cart(
        JSON.parse(
          localStorage.getItem(
            this.configService.config.id + '_cart'
          )
        )
      );
    });
  }
}
