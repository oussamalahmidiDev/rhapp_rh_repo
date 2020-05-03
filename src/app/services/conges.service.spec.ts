import { TestBed } from '@angular/core/testing';

import { CongesService } from './conges.service';

describe('CongesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CongesService = TestBed.get(CongesService);
    expect(service).toBeTruthy();
  });
});
