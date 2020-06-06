import { Component, OnInit } from '@angular/core';
import { ConfigService } from 'src/app/services/config.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isNavbarCollapsed = true;
  config: any;

  constructor(
    private configService: ConfigService,
    public cartService: CartService
  ) { }

  ngOnInit(): void {
    this.configService.getConfig().subscribe(result => {
      this.config = result;
    });
  }

  onLinkClick(event) {
    this.isNavbarCollapsed = true;
  }

  remove(event: MouseEvent, cartItem) {
    event.stopPropagation();
    event.stopImmediatePropagation();
    
    this.cartService.cart.removeFromCart(cartItem)
  }

}
