import { TestBed } from '@angular/core/testing';

import { RepresentantesService } from './representantes.service';

describe('RepresentantesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RepresentantesService = TestBed.get(RepresentantesService);
    expect(service).toBeTruthy();
  });
});
