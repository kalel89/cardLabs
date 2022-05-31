import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelCargarDatosComponent } from './panel-cargar-datos.component';

describe('PanelCargarDatosComponent', () => {
  let component: PanelCargarDatosComponent;
  let fixture: ComponentFixture<PanelCargarDatosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PanelCargarDatosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PanelCargarDatosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
