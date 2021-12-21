import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaAnimalesMicrochipComponent } from './lista-animales-microchip.component';

describe('ListaAnimalesMicrochipComponent', () => {
  let component: ListaAnimalesMicrochipComponent;
  let fixture: ComponentFixture<ListaAnimalesMicrochipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaAnimalesMicrochipComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaAnimalesMicrochipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
