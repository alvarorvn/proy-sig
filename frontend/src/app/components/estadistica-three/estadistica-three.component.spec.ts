import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EstadisticaThreeComponent } from './estadistica-three.component';

describe('EstadisticaThreeComponent', () => {
  let component: EstadisticaThreeComponent;
  let fixture: ComponentFixture<EstadisticaThreeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EstadisticaThreeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EstadisticaThreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
