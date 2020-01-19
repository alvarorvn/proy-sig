import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PagoDocentesComponent } from './pago-docentes.component';

describe('PagoDocentesComponent', () => {
  let component: PagoDocentesComponent;
  let fixture: ComponentFixture<PagoDocentesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PagoDocentesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PagoDocentesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
