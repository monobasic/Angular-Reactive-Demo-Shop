export class Product {
    id: number;
    date?: string;
    name: string;
    description: string;
    price: number;
    priceNormal: number;
    reduction?: number;
    imageURLs: string[];
    imageRefs?: string[];
    categories: string[];
    ratings?: {};
    currentRating?: number;
    sale?: boolean;
}
