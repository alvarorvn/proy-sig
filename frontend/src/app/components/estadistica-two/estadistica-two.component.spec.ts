import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EstadisticaTwoComponent } from './estadistica-two.component';

describe('EstadisticaTwoComponent', () => {
  let component: EstadisticaTwoComponent;
  let fixture: ComponentFixture<EstadisticaTwoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EstadisticaTwoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EstadisticaTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
