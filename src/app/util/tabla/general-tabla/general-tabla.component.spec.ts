import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralTablaComponent } from './general-tabla.component';

describe('GeneralTablaComponent', () => {
  let component: GeneralTablaComponent;
  let fixture: ComponentFixture<GeneralTablaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GeneralTablaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneralTablaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
