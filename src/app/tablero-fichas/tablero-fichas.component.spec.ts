import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableroFichasComponent } from './tablero-fichas.component';

describe('TableroFichasComponent', () => {
  let component: TableroFichasComponent;
  let fixture: ComponentFixture<TableroFichasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableroFichasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableroFichasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
