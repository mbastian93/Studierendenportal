import {Room} from './room';
import {Person} from './person';

export class UniEvent {
  title: string;
  description: string;
  endDate: string;
  endTime: string;
  presenter: string;
  location = {} as Room;
  startDate: string;
  startTime: string;
  person = {} as Person;
}
