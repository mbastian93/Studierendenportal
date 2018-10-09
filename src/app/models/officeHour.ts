export class OfficeHour {
  startTime: string;
  endTime: string;
  startDay: string;
  endDay: string;
  comment: string;

  constructor(startTime: string, endTime: string, startDay: string, endDay: string, comment: string) {
    this.startTime = startTime;
    this.endTime = endTime;
    this.startDay = startDay;
    this.endDay = endDay;
    this.comment = comment;
  }
  printDays(): string {
    let  res = '';
    if (this.endDay !== undefined) {
      res = this.startDay + ' - ' + this.endDay;
    } else {
      res = this.startDay;
    }
    return res;
  }

  printHours(): string {
    return this.startTime + ' - ' + this.endTime + 'Uhr';
  }
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
