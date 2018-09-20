export class Office {
  name: string;
  officeHours: OfficeHour[] = [];
  exceptions: OfficeHour;
}

export class OfficeHour {
  days: Weekday[] = [];
  startTime: string;
  endTime: string;
  comment: string;
}

export enum Weekday {
  So,
  Mo,
  Di,
  Mi,
  Do,
  Fr,
  Sa
}
