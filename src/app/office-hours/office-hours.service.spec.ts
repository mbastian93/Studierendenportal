import { TestBed, inject } from '@angular/core/testing';

import { OfficeHoursService } from './office-hours.service';

describe('OfficeHoursService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OfficeHoursService]
    });
  });

  it('should be created', inject([OfficeHoursService], (service: OfficeHoursService) => {
    expect(service).toBeTruthy();
  }));
});
