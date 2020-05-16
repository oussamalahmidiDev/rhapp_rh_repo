import { TestBed } from '@angular/core/testing';

import { RetraitesService } from './retraites.service';

describe('RetraitesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RetraitesService = TestBed.get(RetraitesService);
    expect(service).toBeTruthy();
  });
});
