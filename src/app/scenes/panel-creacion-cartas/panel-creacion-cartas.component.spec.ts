import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelCreacionCartasComponent } from './panel-creacion-cartas.component';

describe('PanelCreacionCartasComponent', () => {
  let component: PanelCreacionCartasComponent;
  let fixture: ComponentFixture<PanelCreacionCartasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PanelCreacionCartasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PanelCreacionCartasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
