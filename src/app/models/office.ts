export class Office {
  name: string;
  openingHoursForDays: Map<Weekday, OfficeHours[]> = new Map<Weekday, OfficeHours[]>([
    [Weekday.Montag, <OfficeHours[]>[]],
    [Weekday.Dienstag, <OfficeHours[]>[]],
    [Weekday.Mitwoch, <OfficeHours[]>[]],
    [Weekday.Donnerstag, <OfficeHours[]>[]],
    [Weekday.Freitag, <OfficeHours[]>[]],
    [Weekday.Samstag, <OfficeHours[]>[]],
    [Weekday.Sonntag, <OfficeHours[]>[]],
  ]);
  exceptions: OfficeHours;
}

class OfficeHours {
  startTime: string;
  endTime: string;
  comment: string;
}

export enum Weekday {
  Sonntag,
  Montag,
  Dienstag,
  Mitwoch,
  Donnerstag,
  Freitag,
  Samstag
}

