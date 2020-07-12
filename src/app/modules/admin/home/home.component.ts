import { Component, OnInit } from '@angular/core';
import { OrdersService } from 'src/app/services/orders.service';
import { Subscription } from 'rxjs';
import { Order } from 'src/app/models/order';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  orders: Order[];
  subOrders: Subscription;
  
  constructor(
    private ordersService: OrdersService,
    private router: Router,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.subOrders = this.ordersService.getOrders().subscribe(orders => {
      this.orders = orders;
    });
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

  confirmDelete(content, order: Order) {
    const ref = this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.deleteOrder(order);
    }, (reason) => {
      
    });
    
  }
}
