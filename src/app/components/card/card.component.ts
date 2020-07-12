import { Component, OnInit, OnDestroy } from '@angular/core';
import { ConfigService } from 'src/app/services/config.service';
import { Subscription } from 'rxjs';
import { ProductsService } from 'src/app/services/products.service';
import { Product } from 'src/app/models/product';
import { GroupsService } from 'src/app/services/groups.service';
import { Group } from 'src/app/models/group';
import { Router, ActivatedRoute } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit, OnDestroy {

  config: any;

  subProducts: Subscription;
  subGroups: Subscription;
  routeSub: Subscription;
  groupUrl: string;

  products: Product[];
  groups: Group[];

  toAdd: Object = {};

  constructor(
    private configService: ConfigService,
    private productsService: ProductsService,
    private groupsService: GroupsService,
    private route: ActivatedRoute,
    private cartService: CartService
  ) { }

  ngOnInit() {
    this.configService.getConfig().subscribe(result => {
      this.config = result;
    });

    this.route.params.subscribe(params => {
      if (params['group']) {
        this.groupUrl = params['group'];
      }

      this.subGroups = this.groupsService.getGroups().subscribe(groups => {
        this.groups = groups;
        this.createProducts();
      });
      this.subProducts = this.productsService.getProducts().subscribe(products => {
        this.products = products;
        this.createProducts();
      });
    });
  }

  ngOnDestroy(): void {
    if (this.subProducts) {
      this.subProducts.unsubscribe();
    }
    if (this.subGroups) {
      this.subGroups.unsubscribe();
    }
    if (this.routeSub) {
      this.routeSub.unsubscribe();
    }
  }

  createProducts() {
    if (this.groups && this.products) {
      if (!this.groupUrl && this.groups[0]) {
        this.groupUrl = this.groups[0].url;
      }
      
      const currentGroup = this.groups.find(group => group.url === this.groupUrl);
      this.products = this.products.filter(product => product.groupId === currentGroup.id);


      this.products.forEach(product => {
        this.toAdd[product.id] = 1;
      });
    }

  }

  substract(id) {
    if (this.toAdd[id] > 1) {
      this.toAdd[id] -= 1;
    }
  }

  add(id) {
    this.toAdd[id] += 1;
  }

  addToCart(id) {
    const product = this.products.find(p => p.id === id);
    this.cartService.addItemToCart(product, parseInt(this.toAdd[id]));

    this.toAdd[id] = 1;

  }
}
