import { TestBed } from '@angular/core/testing';

import { AvantagesService } from './avantages.service';

describe('AvantagesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AvantagesService = TestBed.get(AvantagesService);
    expect(service).toBeTruthy();
  });
});
