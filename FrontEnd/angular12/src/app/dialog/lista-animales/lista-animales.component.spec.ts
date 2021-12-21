import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaAnimalesComponent } from './lista-animales.component';

describe('ListaAnimalesComponent', () => {
  let component: ListaAnimalesComponent;
  let fixture: ComponentFixture<ListaAnimalesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaAnimalesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaAnimalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
