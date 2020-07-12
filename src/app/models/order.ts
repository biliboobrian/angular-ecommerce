import { Cart } from './cart';
import { OrderItem } from './order-item';

export class Order {
    id: string;
    name: string;
    phone: string;
    day: string;
    hour: string;
    min: Date;
    status: number = 0;
    items: OrderItem[];

    constructor(obj: any = null) {
        if (obj) {
            this.id = obj.id;
            this.name = obj.name;
            this.phone = obj.phone;
            this.day = obj.day;
            this.hour = obj.hour;
            this.min = obj.min;
        }
    }

    addCart(cart: Cart) {
        this.items = [];
        let oi: OrderItem;

        cart.items.forEach(ci => {
            oi = new OrderItem();
            oi.nb = ci.nb;
            oi.productId = ci.product.id;
            this.items.push(oi);
        });
    }

    toObj() {
        const o:any = {
            name: this.name,
            phone: this.phone,
            day: this.day,
            hour: this.hour,
            min: this.min,
            items: []
        };

        this.items.forEach(oi => {
            o.items.push({
                nb: oi.nb,
                productId: oi.productId 
            });
        });

        return o;
    }
}
