import { Component, OnInit, OnDestroy } from '@angular/core';
import { ConfigService } from 'src/app/services/config.service';
import { ActivatedRoute } from '@angular/router';
import { OrdersService } from 'src/app/services/orders.service';
import { Order } from 'src/app/models/order';

@Component({
  selector: 'app-tracker',
  templateUrl: './tracker.component.html',
  styleUrls: ['./tracker.component.css']
})
export class TrackerComponent implements OnInit, OnDestroy {

  config: any;
  order: Order;
  waitingTime: Date = new Date();
  widthStatus: string[] = [];
  interval: any;

  constructor(
    private configService: ConfigService,
    private activeRoute: ActivatedRoute,
    private ordersService: OrdersService
  ) { }

  ngOnInit(): void {
    this.configService.getConfig().subscribe(result => {
      this.config = result;
    });

    this.activeRoute.params.subscribe(params => {
      this.ordersService.getById(params.id).subscribe(order => {
        this.order = order;
        this.waitingTime = new Date();
      })
    });

    this.interval = setInterval(() => {
      this.updateStatus();
    }, 1000);
  }

  ngOnDestroy() {
    clearInterval(this.interval);
  }

  getWidthStatus(status: number) {
    if(this.order) {
      if(this.order.status > status) {
        return '100%';
      } else if(this.order.status === status && [0, 3].indexOf(status) === -1) {
        const now = new Date();
        return ((now.getTime() - this.waitingTime.getTime()) / 1000 / 5) +'%';
      } else {
        return '0%'; 
      }
    }
    
  }

  updateStatus() {
    [0, 1, 2, 3].forEach(num => {
      this.widthStatus[num] = this.getWidthStatus(num);
    })
  }

}
