import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentOnemoneyPage } from './payment-onemoney.page';

describe('PaymentOnemoneyPage', () => {
  let component: PaymentOnemoneyPage;
  let fixture: ComponentFixture<PaymentOnemoneyPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymentOnemoneyPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentOnemoneyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
