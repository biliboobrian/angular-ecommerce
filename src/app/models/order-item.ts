import { Product } from './product';

export class OrderItem {
    productId: string;
    nb: number;

    constructor(obj: any = null) {
        if (obj) {
            this.productId = obj.productId;
            this.nb = obj.nb;
        }
    }
}
