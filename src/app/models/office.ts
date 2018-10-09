import {OfficeHour} from './officeHour';

export class Office {
  name: string;
  officeHours: OfficeHour[] = [];
  exceptions: OfficeHour;
}
