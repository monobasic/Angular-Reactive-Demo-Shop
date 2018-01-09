import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavigationOffCanvasComponent } from './navigation-off-canvas.component';

describe('NavigationOffCanvasComponent', () => {
  let component: NavigationOffCanvasComponent;
  let fixture: ComponentFixture<NavigationOffCanvasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavigationOffCanvasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavigationOffCanvasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
