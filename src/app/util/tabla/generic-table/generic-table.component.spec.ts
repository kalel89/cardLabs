import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Ficha } from 'src/app/interfaces/i-ficha';

import { GenericTableComponent } from './generic-table.component';

describe('GeneralTablaComponent', () => {
  let component: GenericTableComponent<Ficha>;
  let fixture: ComponentFixture<GenericTableComponent<Ficha>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GenericTableComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    //fixture = TestBed.createComponent(GenericTableComponent<T t Ficha>);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
