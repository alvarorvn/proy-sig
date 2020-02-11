import { TestBed } from '@angular/core/testing';

import { PagoPersonalService } from './pago-personal.service';

describe('PagoPersonalService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PagoPersonalService = TestBed.get(PagoPersonalService);
    expect(service).toBeTruthy();
  });
});
