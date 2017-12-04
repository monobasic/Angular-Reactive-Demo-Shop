import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const products = [
      { id: 11, name: 'Gloves' },
      { id: 12, name: 'Sneakers' },
      { id: 13, name: 'Jacket' },
      { id: 14, name: 'Parka' },
      { id: 15, name: 'Socks' },
      { id: 16, name: 'Snowboard' },
      { id: 17, name: 'CBD-Cannabis-Pack' },
      { id: 18, name: 'Applepie' },
      { id: 19, name: 'Fancy Pants' },
      { id: 20, name: 'Tornado-Shelter-Pack' }
    ];
    return { products };
  }
}
