import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkoutSchedulePage } from './workout-schedule.page';

describe('WorkoutSchedulePage', () => {
  let component: WorkoutSchedulePage;
  let fixture: ComponentFixture<WorkoutSchedulePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkoutSchedulePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkoutSchedulePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
