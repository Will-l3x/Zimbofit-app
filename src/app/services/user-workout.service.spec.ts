import { TestBed } from '@angular/core/testing';

import { UserWorkoutService } from './user-workout.service';

describe('UserWorkoutService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UserWorkoutService = TestBed.get(UserWorkoutService);
    expect(service).toBeTruthy();
  });
});
