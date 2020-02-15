import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EstadisticaOneComponent } from './estadistica-one.component';

describe('EstadisticaOneComponent', () => {
  let component: EstadisticaOneComponent;
  let fixture: ComponentFixture<EstadisticaOneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EstadisticaOneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EstadisticaOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
