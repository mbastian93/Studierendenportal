import {Venue} from './venue';
import {Person} from './person';

export class UniEvent {
  title: string;
  description: string;
  endDate: string;
  endTime: string;
  presenter: string;
  location: Venue;
  startDate: string;
  startTime: string;
  person: Person;
}
