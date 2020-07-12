import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { OrdersService } from 'src/app/services/orders.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent implements OnInit {

  submitted = false;
  id = null;

  orderForm: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    description: new FormControl('')
  });

  constructor(
    private ordersService: OrdersService,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit(): void {

    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.ordersService.getOrders().subscribe(orders => {
        const order = orders.find(order=> order.id === this.id);
        
        if(order) {
          this.orderForm.patchValue(order);
        }
      })
    }
  }

  saveOrder() {
    this.submitted = true;

    if (this.orderForm.valid) {
      let order = this.orderForm.value;
      order.url = order.name.normalize('NFD').replace(/[\u0300-\u036f]/g, "").replace(' ', '-').toLowerCase();
      if (this.id) {
        this.ordersService.updateOrder({ id: this.id, ...this.orderForm.value }).then(() => {
          this.router.navigate(['admin', 'orders']);
        });
      } else {
        this.ordersService.createOrder(this.orderForm.value).then(() => {
          this.router.navigate(['admin', 'orders']);
        });
      }

    }
  }

  back() {
    this.location.back();
  }

}
