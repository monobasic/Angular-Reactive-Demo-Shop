export class Product {
    id: number;
    date: Date;
    name: string;
    description: string;
    price: number;
    priceNormal: number;
    reduction?: number;
    imageURLs: string[];
    categories: string[];
}
