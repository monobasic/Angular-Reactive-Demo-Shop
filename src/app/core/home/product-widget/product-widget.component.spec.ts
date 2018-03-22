import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductWidgetComponent } from './product-widget.component';

describe('ProductWidgetComponent', () => {
  let component: ProductWidgetComponent;
  let fixture: ComponentFixture<ProductWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductWidgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
