import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EstadisticaFourComponent } from './estadistica-four.component';

describe('EstadisticaFourComponent', () => {
  let component: EstadisticaFourComponent;
  let fixture: ComponentFixture<EstadisticaFourComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EstadisticaFourComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EstadisticaFourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
