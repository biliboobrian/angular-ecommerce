import { Component, OnInit, OnDestroy } from '@angular/core';
import { Order } from 'src/app/models/order';
import { OrdersService } from 'src/app/services/orders.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfigService } from 'src/app/services/config.service';
import { Config } from 'protractor';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit, OnDestroy {

  orders: Order[];
  subOrders: Subscription;
  config: Config;
  
  constructor( 
    private ordersService: OrdersService,
    private configService: ConfigService,
    private loadingService: LoadingService,
    private router: Router,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.subOrders = this.ordersService.getOrders().subscribe(orders => {
      this.orders = orders;
    });

    this.configService.getConfig().subscribe(config => {
      this.config = config;
    })


  }

  ngOnDestroy(): void {
    this.subOrders.unsubscribe();
  }

  addOrder() {
    this.router.navigate(['admin', 'orders', 'add']);
  }

  editOrder(order: Order) { 
    this.router.navigate(['admin', 'orders', 'edit', order.id]);
  }

  deleteOrder(order: Order) { 
    this.ordersService.deleteOrder(order.id);
  }

  getStatus(order: Order) {
    if(!order.status) {
      order.status = 0;
    }

    if(this.config) {
      return this.config.status[order.status];
    }
  }

  changeStatus(order: Order, step: number) {
    order.status += step;
    this.loadingService.isLoading = true;

    this.ordersService.updateOrder(order).then(order => {
      this.loadingService.isLoading = false;
    });
  }

  confirmDelete(content, order: Order) {
    const ref = this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.deleteOrder(order);
    }, (reason) => {
      
    });
    
  }
}
