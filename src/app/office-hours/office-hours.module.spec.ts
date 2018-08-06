import { OfficeHoursModule } from './office-hours.module';

describe('OfficeHoursModule', () => {
  let officeHoursModule: OfficeHoursModule;

  beforeEach(() => {
    officeHoursModule = new OfficeHoursModule();
  });

  it('should create an instance', () => {
    expect(officeHoursModule).toBeTruthy();
  });
});
