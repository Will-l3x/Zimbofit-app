import { TestBed } from '@angular/core/testing';

import { ScheduledWorkoutService } from './scheduled-workout.service';

describe('ScheduledWorkoutService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ScheduledWorkoutService = TestBed.get(ScheduledWorkoutService);
    expect(service).toBeTruthy();
  });
});
