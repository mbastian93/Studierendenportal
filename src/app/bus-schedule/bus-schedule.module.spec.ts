import { BusScheduleModule } from './bus-schedule.module';

describe('BusStopModule', () => {
  let busStopModule: BusScheduleModule;

  beforeEach(() => {
    busStopModule = new BusScheduleModule();
  });

  it('should create an instance', () => {
    expect(busStopModule).toBeTruthy();
  });
});
