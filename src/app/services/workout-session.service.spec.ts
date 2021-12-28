import { TestBed } from '@angular/core/testing';

import { WorkoutSessionService } from './workout-session.service';

describe('WorkoutSessionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WorkoutSessionService = TestBed.get(WorkoutSessionService);
    expect(service).toBeTruthy();
  });
});
