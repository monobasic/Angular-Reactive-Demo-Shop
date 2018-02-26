import { Component, OnInit } from '@angular/core';
import {
  ActivatedRoute,
  UrlSegment,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
  currentLocation;
  constructor(private route: ActivatedRoute, private location: Location) {}

  ngOnInit() {
    console.log(this.route.snapshot);
    console.log(this.route.children);
    const loc = this.route.params.subscribe((para) => {
      console.log(para);
    });
  }
  getLocation() {}
}
