import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../products/shared/product.service';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  products: any[];
  term$ = new Subject<string>();

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.term$
      .debounceTime(400)
      .distinctUntilChanged()
      .filter(term => term.length > 0)
      .switchMap(term => this.search(term))
      .subscribe(results => {
        this.products = results;
        console.log(this.products);
      });
  }

  search(term: string) {
    console.log('search for: ' + term);
    return this.productService.findProducts(term);
  }

  onSearchInput(event) {
    let term = event.target.value;
    if (term.length > 0) {
      term = term.charAt(0).toUpperCase() + term.slice(1);
      this.term$.next(term);
    } else {
      this.products = [];
      this.term$.next('');
    }
  }


}
