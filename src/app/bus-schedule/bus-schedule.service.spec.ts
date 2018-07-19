import { TestBed, inject } from '@angular/core/testing';

import { BusScheduleService } from './bus-schedule.service';

describe('BusStopService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BusScheduleService]
    });
  });

  it('should be created', inject([BusScheduleService], (service: BusScheduleService) => {
    expect(service).toBeTruthy();
  }));
});
