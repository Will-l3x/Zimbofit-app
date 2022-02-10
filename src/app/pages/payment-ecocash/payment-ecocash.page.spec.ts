import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentEcocashPage } from './payment-ecocash.page';

describe('PaymentEcocashPage', () => {
  let component: PaymentEcocashPage;
  let fixture: ComponentFixture<PaymentEcocashPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymentEcocashPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentEcocashPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
