import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RatingStarsComponent } from './rating-stars.component';

describe('RatingStarsComponent', () => {
  let component: RatingStarsComponent;
  let fixture: ComponentFixture<RatingStarsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RatingStarsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RatingStarsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
