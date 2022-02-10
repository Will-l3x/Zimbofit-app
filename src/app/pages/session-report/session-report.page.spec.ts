import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SessionReportPage } from './session-report.page';

describe('SessionReportPage', () => {
  let component: SessionReportPage;
  let fixture: ComponentFixture<SessionReportPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SessionReportPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SessionReportPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
