import {Contact} from './contact';

export class Person {
  firstname: string;
  lastname: string;
  contact = {} as Contact;
  orgname: string;
  key: string;

  constructor(key: string) {
    this.key = key;
  }
}
