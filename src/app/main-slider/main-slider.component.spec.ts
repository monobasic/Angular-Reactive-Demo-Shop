import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainSliderComponent } from './main-slider.component';

describe('MainSliderComponent', () => {
  let component: MainSliderComponent;
  let fixture: ComponentFixture<MainSliderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainSliderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
