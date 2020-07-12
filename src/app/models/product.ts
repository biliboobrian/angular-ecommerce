export class Product {
    id: string;
    groupId: string;
    name: string;
    description: string;
    img: string;
    creationDate: Date;
    active: boolean;
    outOfStock: boolean;
    price: number;
    quantity: number;
    onHome: boolean;

    constructor(obj: any = null) {
        if (obj) {
            this.id = obj.id;
            this.groupId = obj.groupId;
            this.name = obj.name;
            this.description = obj.description;
            this.img = obj.img;
            this.creationDate = obj.creationDate;
            this.active = obj.active;
            this.outOfStock = obj.outOfStock;
            this.price = obj.price;
            this.quantity = obj.quantity;
        }
    }
}
