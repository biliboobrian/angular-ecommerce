export class Group {
    id: string;
    name: string;
    url: string;
    description: string;

    constructor(obj: any = null) {
        if (obj) {
            this.id = obj.id;
            this.name = obj.name;
            this.url = obj.url;
            this.description = obj.description;
        }
    }
}
