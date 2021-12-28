import { TestBed } from '@angular/core/testing';

import { MuscleGroupService } from './muscle-group.service';

describe('MuscleGroupService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MuscleGroupService = TestBed.get(MuscleGroupService);
    expect(service).toBeTruthy();
  });
});
