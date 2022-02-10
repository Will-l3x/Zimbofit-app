import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SessionExerciseSetAdjustComponent } from './session-exercise-set-adjust.component';

describe('SessionExerciseSetAdjustComponent', () => {
  let component: SessionExerciseSetAdjustComponent;
  let fixture: ComponentFixture<SessionExerciseSetAdjustComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SessionExerciseSetAdjustComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SessionExerciseSetAdjustComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
