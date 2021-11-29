import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaxonomiaComponent } from './taxonomia.component';

describe('TaxonomiaComponent', () => {
  let component: TaxonomiaComponent;
  let fixture: ComponentFixture<TaxonomiaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaxonomiaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaxonomiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
