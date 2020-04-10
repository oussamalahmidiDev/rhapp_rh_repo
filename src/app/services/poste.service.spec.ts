import { TestBed } from '@angular/core/testing';

import { PosteService } from './poste.service';

describe('PosteService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PosteService = TestBed.get(PosteService);
    expect(service).toBeTruthy();
  });
});
