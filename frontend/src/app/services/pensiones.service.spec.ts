import { TestBed } from '@angular/core/testing';

import { PensionesService } from './pensiones.service';

describe('PensionesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PensionesService = TestBed.get(PensionesService);
    expect(service).toBeTruthy();
  });
});
