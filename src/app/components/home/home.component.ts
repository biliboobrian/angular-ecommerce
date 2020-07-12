import { Component, OnInit } from '@angular/core';
import { ConfigService } from 'src/app/services/config.service';
import { ProductsService } from 'src/app/services/products.service';
import { Product } from 'src/app/models/product';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  config: any;
  products: Product[];
  toAdd: any = [];

  constructor(
    private productsService: ProductsService,
    private configService: ConfigService,
    private cartService: CartService
  ) { }

  ngOnInit(): void {
    this.configService.getConfig().subscribe(result => {
      this.config = result;
    });

    this.productsService.getProducts().subscribe(products => {
      this.products = products.filter(product => product.onHome);
      
      this.products.forEach(product => {
        this.toAdd[product.id] = 1;
      });
    })
  }

  addToCart(id) {
    const product = this.products.find(p => p.id === id);
    this.cartService.addItemToCart(product, this.toAdd[id]);

    this.toAdd[id] = 1;
  }



  substract(id) {
    if(this.toAdd[id] > 1) {
      this.toAdd[id] -= 1;
    }
  }

  add(id) {
      this.toAdd[id] += 1;
  }

}
