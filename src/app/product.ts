export class Product {
    id: number;
    name: string;
    description: string;
    descriptionLong?: string;
    price: number;
    reduction?: number;
    imageURLs: string[];
    ratingIDs?: number[];
    reviewIDs?: number[];
    sizes: number[];
    colors: string[];
    categoryIDs: number[];
}
