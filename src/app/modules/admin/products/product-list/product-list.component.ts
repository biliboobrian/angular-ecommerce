import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ProductsService } from 'src/app/services/products.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products: Product[];
  subProducts: Subscription;
  
  constructor( 
    private productsService: ProductsService,
    private router: Router,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.subProducts = this.productsService.getProducts(null).subscribe(products => {
      this.products = products;
    });
  }

  ngOnDestroy(): void {
    this.subProducts.unsubscribe();
  }

  addProduct() {
    this.router.navigate(['admin', 'products', 'add']);
  }

  editProduct(product: Product) { 
    this.router.navigate(['admin', 'products', 'edit', product.id]);
  }

  deleteProduct(product: Product) { 
    this.productsService.deleteProduct(product.id);
  }

  confirmDelete(content, product: Product) {
    const ref = this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.deleteProduct(product);
    }, (reason) => {
      
    });
    
  }
}
