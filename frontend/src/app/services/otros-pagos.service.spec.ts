import { TestBed } from '@angular/core/testing';

import { OtrosPagosService } from './otros-pagos.service';

describe('OtrosPagosService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OtrosPagosService = TestBed.get(OtrosPagosService);
    expect(service).toBeTruthy();
  });
});
