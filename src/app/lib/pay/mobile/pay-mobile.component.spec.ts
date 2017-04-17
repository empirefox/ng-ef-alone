import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PayMobileComponent } from './pay-mobile.component';

describe('PayMobileComponent', () => {
  let component: PayMobileComponent;
  let fixture: ComponentFixture<PayMobileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PayMobileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PayMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
