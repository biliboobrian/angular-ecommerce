import { CartItem } from './cart-item';
import { Product } from './product';

export class Cart {
    items: CartItem[] = [];

    constructor(obj: any = null) {
        if (obj) {
            if(obj.items) {
                obj.items.forEach(item => {
                    this.items.push(new CartItem(item));
                })
            }
        }
    }

    addToCart(product: Product, nb: number) {
        const cartItem = this.items.find(item => item.product.id === product.id);

        if (cartItem) {
            cartItem.nb += nb;
        } else {
            this.items.push(new CartItem({ product, nb }));
        }
    } 
    
    removeFromCart(cartItem: CartItem) {
        const index: number = this.items.indexOf(cartItem);
        if (index !== -1) {
            this.items.splice(index, 1);
        }    
    }

    getTotalPrice(): number {
        let total = 0;

        this.items.forEach(item => {
            total += item.getTotal();
        })

        return total;
    }

    getTotalItems(): number {
        let total = 0;

        this.items.forEach(item => {
            total += item.nb;
        })

        return total;
    }
}
