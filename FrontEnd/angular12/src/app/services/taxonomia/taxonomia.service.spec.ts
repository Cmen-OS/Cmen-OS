import { TestBed } from '@angular/core/testing';

import { TaxonomiaService } from './taxonomia.service';

describe('TaxonomiaService', () => {
  let service: TaxonomiaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaxonomiaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
