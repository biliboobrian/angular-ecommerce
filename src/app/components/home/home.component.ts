import { Component, OnInit } from '@angular/core';
import { ConfigService } from 'src/app/services/config.service';
import { ProductsService } from 'src/app/services/products.service';
import { Product } from 'src/app/models/product';

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
    private configService: ConfigService
  ) { }

  ngOnInit(): void {
    this.configService.getConfig().subscribe(result => {
      this.config = result;
    });

    this.productsService.getProducts(true).subscribe(products => {
      this.products = products;
    })
  }

}
