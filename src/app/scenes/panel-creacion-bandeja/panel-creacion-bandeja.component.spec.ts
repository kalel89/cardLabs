import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelCreacionBandejaComponent } from './panel-creacion-bandeja.component';

describe('PanelCreacionBandejaComponent', () => {
  let component: PanelCreacionBandejaComponent;
  let fixture: ComponentFixture<PanelCreacionBandejaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PanelCreacionBandejaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PanelCreacionBandejaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
