import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';
import { ConfigService } from 'src/app/services/config.service';
import { CartService } from 'src/app/services/cart.service';
import { Product } from 'src/app/models/product';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { OrdersService } from 'src/app/services/orders.service';
import { Order } from 'src/app/models/order';
import { Router } from '@angular/router';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  config: any;
  products: Product[];
  submitted = false;
  loading = true;
  days: any[];

  form: FormGroup = new FormGroup({
    name: new FormControl(null, Validators.required),
    phone: new FormControl(null, [Validators.required, Validators.pattern('0[1-7][0-9]{8}')]),
    day: new FormControl(null, Validators.required),
    hour: new FormControl(null, [Validators.required, Validators.pattern('[0-9]*')]),
    min: new FormControl(null, [Validators.required, Validators.pattern('[0-9]*')]),
    checkSave: new FormControl(null)
  });

  constructor(
    private productsService: ProductsService,
    private configService: ConfigService,
    private ordersService: OrdersService,
    private loadingService: LoadingService,
    private router: Router,
    public cartService: CartService
  ) { }

  ngOnInit(): void {
    this.configService.getConfig().subscribe(result => {
      this.config = result;
      const saved = JSON.parse(
        localStorage.getItem(
          this.configService.config.id + '_order'
        )
      );

      if(saved && saved.name && saved.phone) {
        this.form.get('name').setValue(saved.name);
        this.form.get('phone').setValue(saved.phone);
        this.form.get('checkSave').setValue(true);
      }

      this.days = this.getPossibleDays();
    });

    this.productsService.getProducts().subscribe(products => {
      this.products = products;
    });
  }
  getTwoDigits(n: Number): string {
    let nToString = n.toString();

    if(nToString.length < 2) {
      nToString = "0" + nToString;
    }

    return nToString;
  }

  getPossibleDays(): any[] {
    let possibleDays = [];

    if (this.config && this.config.howManyDay) {
      let d = new Date();

      for (let index = 0; index < this.config.howManyDay; index++) {
        possibleDays.push({ value: d.getTime(), name: this.config.days[d.getDay()] + " (" + this.getTwoDigits(d.getDate()) +"/"+ this.getTwoDigits(d.getMonth() + 1) + ")" });
        d.setDate(d.getDate() + 1);
      }
    }
    return possibleDays;
  }

  getPossibleHours(): any[] {
    let possibleHours = [];

    if (this.config && this.config.openHours) {
      const day = this.form.get('day').value;
      if (day) {

        const d = new Date(parseInt(day, 10));
        
        this.config.openHours[d.getDay()].forEach((time: any, i: number) => {
          const beginHour = parseInt(time.begin.split(':')[0]);
          const endHour = parseInt(time.end.split(':')[0]);

          for (let index = beginHour; index <= endHour; index++) {
            possibleHours.push({ value: index, name: index });
          }

          if (i !== this.config.openHours[d.getDay()].length - 1) {
            possibleHours.push({ value: null, name: '----' });
          }
        });


      }

    }

    return possibleHours;
  }

  getPossibleMins(): any[] {
    let possibleMins = [];

    if (this.config && this.config.openHours) {
      const day = this.form.get('day').value;

      if (day) {
        const selectedHour = parseInt(this.form.get('hour').value, 10);
        const d = new Date(parseInt(day, 10));
        
        this.config.openHours[d.getDay()].forEach((time: any) => {

          const beginHour = parseInt(time.begin.split(':')[0]);
          const endHour = parseInt(time.end.split(':')[0]);
          const beginMin = parseInt(time.begin.split(':')[1]);
          const endMin = parseInt(time.end.split(':')[1]);

          if (selectedHour >= beginHour && selectedHour <= endHour) {
            if (selectedHour === beginHour) {
              for (let index = beginMin; index <= 45; index += 15) {
                this.pushMins(possibleMins, index);
              }
            } else if (selectedHour > beginHour && selectedHour < endHour) {
              for (let index = 0; index <= 45; index += 15) {
                this.pushMins(possibleMins, index);
              }
            } else {
              for (let index = 0; index <= endMin; index += 15) {
                this.pushMins(possibleMins, index);
              }
            }
          }
        });

      }
    }

    return possibleMins;
  }

  pushMins(arr: any[], num: number) {
    if (num === 0) {
      arr.push({ value: num, name: '00' });
    } else {
      arr.push({ value: num, name: num });
    }
  }

  onSubmit(event) {
    this.submitted = true;
    if(this.form.valid) {
      this.loadingService.isLoading = true; 

      const o = new Order(this.form.value);
      o.addCart(this.cartService.cart);

      if(this.form.get('checkSave').value) {
        localStorage.setItem(
          this.configService.config.id + '_order',
          JSON.stringify({
            name: this.form.get('name').value,
            phone: this.form.get('phone').value
          })
        );
      }
      
      this.ordersService.createOrder(o).then((order) => {
        this.loadingService.isLoading = false;
        this.cartService.emptyCart();
        this.cartService.saveLocal();
        window.scroll(0,0);

        this.router.navigate(['tracker', order.id]);
      });
    }
  }
}
