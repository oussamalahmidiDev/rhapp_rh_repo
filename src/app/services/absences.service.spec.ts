import { TestBed } from '@angular/core/testing';

import { AbsencesService } from './absences.service';

describe('AbsencesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AbsencesService = TestBed.get(AbsencesService);
    expect(service).toBeTruthy();
  });
});
