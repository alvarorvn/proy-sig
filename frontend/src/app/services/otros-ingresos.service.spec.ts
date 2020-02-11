import { TestBed } from '@angular/core/testing';

import { OtrosIngresosService } from './otros-ingresos.service';

describe('OtrosIngresosService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OtrosIngresosService = TestBed.get(OtrosIngresosService);
    expect(service).toBeTruthy();
  });
});
