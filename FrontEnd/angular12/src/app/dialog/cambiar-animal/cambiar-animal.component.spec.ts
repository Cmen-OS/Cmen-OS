import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CambiarAnimalComponent } from './cambiar-animal.component';

describe('CambiarAnimalComponent', () => {
  let component: CambiarAnimalComponent;
  let fixture: ComponentFixture<CambiarAnimalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CambiarAnimalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CambiarAnimalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
