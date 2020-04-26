import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { MainComponent } from './main/main.component';
import { AdminGuard } from './admin.guard';
import { GroupsComponent } from './groups/groups.component';
import { GroupListComponent } from './groups/group-list/group-list.component';
import { GroupDetailComponent } from './groups/group-detail/group-detail.component';
import { ProductsComponent } from './products/products.component';
import { ProductListComponent } from './products/product-list/product-list.component';
import { ProductDetailComponent } from './products/product-detail/product-detail.component';


const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '',
    component: MainComponent,
    canActivate: [AdminGuard],
    children: [
      {
        path: '',
        component: HomeComponent
      },
      {
        path: 'groups',
        component: GroupsComponent,
        children: [
          {
            path: '',
            component: GroupListComponent
          },
          {
            path: 'add',
            component: GroupDetailComponent
          },
          {
            path: 'edit/:id',
            component: GroupDetailComponent
          }
        ]
      },
      {
        path: 'products',
        component: ProductsComponent,
        children: [
          {
            path: '',
            component: ProductListComponent
          },
          {
            path: 'add',
            component: ProductDetailComponent
          },
          {
            path: 'edit/:id',
            component: ProductDetailComponent
          }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
