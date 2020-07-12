import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { MainComponent } from './components/main/main.component';
import { CardComponent } from './components/card/card.component';
import { OrderComponent } from './components/order/order.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { TrackerComponent } from './components/tracker/tracker.component';


const routes: Routes = [
  {
    path:'',
    component: MainComponent,
    children: [
      {
        path: '',
        component: HomeComponent
      },
      {
        path: 'card',
        component: CardComponent
      },
      {
        path: 'card/:group',
        component: CardComponent
      },
      {
        path: 'contact-us',
        component: ContactUsComponent
      },
      {
        path: 'order',
        component: OrderComponent
      },
      {
        path: 'tracker/:id',
        component: TrackerComponent
      }
    ]
  },
  {
    path: 'admin',
    loadChildren: () => import('./modules/admin/admin.module').then(m => m.AdminModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
