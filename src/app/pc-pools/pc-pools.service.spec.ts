import { TestBed, inject } from '@angular/core/testing';

import { PcPoolsService } from './pc-pools.service';

describe('PcPoolsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PcPoolsService]
    });
  });

  it('should be created', inject([PcPoolsService], (service: PcPoolsService) => {
    expect(service).toBeTruthy();
  }));
});
