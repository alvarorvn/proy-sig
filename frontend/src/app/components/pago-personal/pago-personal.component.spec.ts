import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PagoPersonalComponent } from './pago-personal.component';

describe('PagoPersonalComponent', () => {
  let component: PagoPersonalComponent;
  let fixture: ComponentFixture<PagoPersonalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PagoPersonalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PagoPersonalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
