import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopularityComponent } from './popularity.component';

describe('PopularityComponent', () => {
  let component: PopularityComponent;
  let fixture: ComponentFixture<PopularityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopularityComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopularityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
