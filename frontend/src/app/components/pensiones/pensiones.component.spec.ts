import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PensionesComponent } from './pensiones.component';

describe('PensionesComponent', () => {
  let component: PensionesComponent;
  let fixture: ComponentFixture<PensionesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PensionesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PensionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
