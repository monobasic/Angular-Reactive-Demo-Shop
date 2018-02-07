import { Pipe, PipeTransform } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { CurrencyPipe } from '@angular/common';

@Pipe({
  name: 'price'
})
export class PricePipe implements PipeTransform {

  constructor(private decimalPipe: DecimalPipe, private currencyPipe: CurrencyPipe) {}

  transform(price: number, reduction: number): string {
    const priceWithCurrency = this.currencyPipe.transform(price, 'USD');
    const priceReduced = reduction ? (price * (1 - reduction / 100)) : undefined;
    const priceReducedWithCurrency = reduction ?  this.currencyPipe.transform(priceReduced, 'USD') : undefined;

    if (reduction) {
      return `<del class="text-muted text-normal">${priceWithCurrency}</del>${priceReducedWithCurrency}`;
    } else {
      return priceWithCurrency;
    }
  }

}
