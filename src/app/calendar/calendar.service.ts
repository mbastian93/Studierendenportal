import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Venue} from '../models/venue';
import {Person} from '../models/person';
import {UniEvent} from '../models/uniEvent';
import {Observable} from 'rxjs';


const proxy = 'https://cors-anywhere.herokuapp.com/';
const url = 'https://univis.uni-mainz.de/prg?search=events&show=xml';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {


  events: UniEvent[] = [];
  persons = new Map<string, Person>();
  rooms = new Map<string, Venue>();

  constructor(private http: HttpClient) {
  }

  getEvents(): UniEvent[] {
    return this.events;
  }

  getEventsFromServer(): Observable<string> {
    return this.http.get(proxy + url, {responseType: 'text'});
  }

  parseEventsFromXmlToJson(response: string): UniEvent[] {
    const doc = new DOMParser().parseFromString(response, 'text/xml');
    const eventsAsXml = doc.getElementsByTagName('Event');
    const personsAsXml = doc.getElementsByTagName('Person');
    const roomsAsXml = doc.getElementsByTagName('Room');

    // parse room infos from xml
    this.parseRoomsFromXmlToJson(roomsAsXml);
    // parse contact infos from xml
    this.parsePersonsFromXmlToJson(personsAsXml);
    // parse event infos from xml
    for (let index = 0; index < eventsAsXml.length; index++) {
      const eventAsXml = eventsAsXml[index];
      if (eventAsXml.getElementsByTagName('calendar')[0].firstChild.nodeValue === 'nein') {
        continue;
      }
      const event = new UniEvent();
      const contactKey = (eventAsXml.getElementsByTagName('contact')[0].firstChild as Element).getAttribute('key');
      event.person = this.persons.get(contactKey);
      const roomNode = eventAsXml.getElementsByTagName('room');
      let roomKey = '';
      if (roomNode.length > 0) {
        roomKey = (roomNode[0].firstChild as Element).getAttribute('key');
        event.location = this.rooms.get(roomKey);
      } else {
        event.location = {address: '', name: ''};
      }
      let description;
      if ((description = eventAsXml.getElementsByTagName('description')).length > 0) {
        event.description = description[0].firstChild.nodeValue.replace(/\n\s*\n\s*\n/g, '\n\n');
      }
      event.endDate = eventAsXml.getElementsByTagName('enddate')[0].firstChild.nodeValue;
      event.endTime = eventAsXml.getElementsByTagName('endtime')[0].firstChild.nodeValue;
      // add '0' to time when time < 10H (e.g. 9:00...)
      if (event.endTime.length === 4) {
        event.endTime = '0' + event.endTime;
      }
      event.title = eventAsXml.getElementsByTagName('title')[0].firstChild.nodeValue;
      event.presenter = eventAsXml.getElementsByTagName('presenter')[0].firstChild.nodeValue;
      event.startDate = eventAsXml.getElementsByTagName('startdate')[0].firstChild.nodeValue;
      event.startTime = eventAsXml.getElementsByTagName('starttime')[0].firstChild.nodeValue;
      // add '0' to time when time < 10H (e.g. 9:00...)
      if (event.startTime.length === 4) {
        event.startTime = '0' + event.startTime;
      }
      this.events.push(event);
    }
    this.sortEvents(this.events);
    return this.events;
  }

  private parseRoomsFromXmlToJson(roomsAsXml: NodeListOf<Element>) {
    for (let index = 0; index < roomsAsXml.length; index++) {
      const roomAsXml = roomsAsXml[index];
      const key = roomAsXml.getAttribute('key');
      const room = new Venue();
      room.name = roomAsXml.getElementsByTagName('name')[0].firstChild.nodeValue;
      let address;
      if ((address = roomAsXml.getElementsByTagName('address')).length > 0) {
        room.address = address[0].firstChild.nodeValue;
      }
      this.rooms.set(key, room);
    }
  }

  private parsePersonsFromXmlToJson(personsAsXml: NodeListOf<Element>) {
    for (let index = 0; index < personsAsXml.length; index++) {
      const personAsXml = personsAsXml[index];
      const key = personAsXml.getAttribute('key');
      // parse person data from XML
      const person = new Person(key);
      let firstname;
      if ((firstname = personAsXml.getElementsByTagName('firstname')).length > 0) {
        person.firstname = firstname[0].firstChild.nodeValue;
      }
      person.lastname = personAsXml.getElementsByTagName('lastname')[0].firstChild.nodeValue;
      let orgname;
      if ((orgname = personAsXml.getElementsByTagName('orgname')).length > 0) {
        person.orgname = orgname[0].firstChild.nodeValue;
      }
      const location = personAsXml.getElementsByTagName('location')[0] as Element;
      let email;
      if ((email = location.getElementsByTagName('email')).length > 0) {
        person.contact.email = email[0].firstChild.nodeValue;
      }
      let fax;
      if ((fax = location.getElementsByTagName('fax')).length > 0) {
        person.contact.fax = fax[0].firstChild.nodeValue;
      }
      let office;
      if ((office = location.getElementsByTagName('office')).length > 0) {
        person.contact.office = office[0].firstChild.nodeValue;
      }
      let tel;
      if ((tel = location.getElementsByTagName('tel')).length > 0) {
        person.contact.tel = tel[0].firstChild.nodeValue;
      }
      this.persons.set(key, person);
    }
  }

  // sort events by date, newest first
  private sortEvents(events: UniEvent[]) {
    events.sort((left, right): number => {
      if (Date.parse(left.startDate + 'T' + left.startTime) > Date.parse(right.startDate + 'T' + right.startTime)) {
        return 1;
      } else {
        return -1;
      }
    });
  }
}
