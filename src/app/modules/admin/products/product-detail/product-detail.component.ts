import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ProductsService } from 'src/app/services/products.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { GroupsService } from 'src/app/services/groups.service';
import { Group } from 'src/app/models/group';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  submitted = false;
  id = null;
  groups: Group[];

  productForm: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    groupId:  new FormControl('', Validators.required),
    description: new FormControl(''),
    img: new FormControl(''),
    price: new FormControl('', [Validators.min(0), Validators.required]),
    onHome: new FormControl(''),
  });

  constructor(
    private productsService: ProductsService,
    private groupsService: GroupsService,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit(): void {

    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.productsService.getProducts().subscribe(products => {
        const product = products.find(product => product.id === this.id);

        if(product) {
          this.productForm.patchValue(product);
        }
        
      
      })
    }

    this.groupsService.getGroups().subscribe(groups => {
      this.groups = groups;
    })
  }

  saveProduct() {
    this.submitted = true;

    if (this.productForm.valid) {
      if (this.id) {
        this.productsService.updateProduct({ id: this.id, ...this.productForm.value }).then(() => {
          this.router.navigate(['admin', 'products']);
        });
      } else {
        this.productsService.createProduct(this.productForm.value).then(() => {
          this.router.navigate(['admin', 'products']);
        });
      }
    }
  }

  back() {
    this.location.back();
  }

}
