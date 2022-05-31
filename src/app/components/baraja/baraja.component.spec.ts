import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarajaComponent } from './baraja.component';

describe('BarajaComponent', () => {
  let component: BarajaComponent;
  let fixture: ComponentFixture<BarajaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BarajaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BarajaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
