import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { AdminRoutingModule } from './admin-routing.module';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { MainComponent } from './main/main.component';
import { HeaderComponent } from './header/header.component';
import { NgbCollapseModule, NgbDropdownModule, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { GroupsComponent } from './groups/groups.component';
import { ProductsComponent } from './products/products.component';
import { GroupListComponent } from './groups/group-list/group-list.component';
import { GroupDetailComponent } from './groups/group-detail/group-detail.component';
import { ProductListComponent } from './products/product-list/product-list.component';
import { ProductDetailComponent } from './products/product-detail/product-detail.component';


@NgModule({
  declarations: [LoginComponent, HomeComponent, MainComponent, HeaderComponent, GroupsComponent, ProductsComponent, GroupListComponent, GroupDetailComponent, ProductListComponent, ProductDetailComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AdminRoutingModule,
    NgbCollapseModule,
    NgbDropdownModule,
    NgbModalModule
  ]
})
export class AdminModule { }
