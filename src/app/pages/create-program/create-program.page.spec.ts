import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateProgramPage } from './create-program.page';

describe('CreateProgramPage', () => {
  let component: CreateProgramPage;
  let fixture: ComponentFixture<CreateProgramPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateProgramPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateProgramPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
