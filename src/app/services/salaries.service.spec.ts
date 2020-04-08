import { TestBed } from '@angular/core/testing';

import { SalariesService } from './salaries.service';

describe('SalariesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SalariesService = TestBed.get(SalariesService);
    expect(service).toBeTruthy();
  });
});
