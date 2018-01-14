import Review from './review';

export class Product {
    id: number;
    name: string;
    description: string;
    images: string[];
    rating: number;
    reviews: Review[];
    size: number[];
    colors: string[];
    categories: number[];
}
