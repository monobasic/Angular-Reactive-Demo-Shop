export class Product {
    constructor(
        public id: number,
        public date: string,
        public name: string,
        public description: string,
        public price: number,
        public priceNormal: number,
        public reduction: number,
        public imageURLs: string[],
        public imageRefs: string[],
        public categories: string[],
        public ratings: {},
        public currentRating: number,
        public sale: boolean
    ) {}
}
