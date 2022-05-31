import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelSetteoInicialComponent } from './panel-setteo-inicial.component';

describe('PanelSetteoInicialComponent', () => {
  let component: PanelSetteoInicialComponent;
  let fixture: ComponentFixture<PanelSetteoInicialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PanelSetteoInicialComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PanelSetteoInicialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
