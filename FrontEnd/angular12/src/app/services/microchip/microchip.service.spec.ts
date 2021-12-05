import { TestBed } from '@angular/core/testing';

import { MicrochipService } from './microchip.service';

describe('MicrochipService', () => {
  let service: MicrochipService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MicrochipService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
