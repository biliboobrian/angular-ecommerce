import { Product } from './product';

export class CartItem {
    product: Product;
    nb: number;

    constructor(obj: any = null) {
        if (obj) {
            this.product = new Product(obj.product);
            this.nb = obj.nb;
        }

    }

    getTotal(): number {
        return this.product.price * this.nb;
    }
}
