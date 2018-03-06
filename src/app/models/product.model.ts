export class Product {
    id: number;
    date: string;
    name: string;
    description: string;
    price: number;
    priceNormal: number;
    reduction?: number;
    imageURLs: string[];
    categories: string[];
    ratings: { userId: number, rating: number }[];
}
