import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Room} from '../models/room';
import {Person} from '../models/person';
import {UniEvent} from '../models/event';


const proxy = 'https://cors-anywhere.herokuapp.com/';
const url = 'https://univis.uni-mainz.de/prg?search=events&show=xml';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {

  events: UniEvent[] = [];
  persons = {};
  rooms = {};
  private domParser: DOMParser = new DOMParser();

  constructor(
    private http: HttpClient
  ) {
  }

  getEvents() {
    if (this.events.length > 0) {
      return;
    }
    this.http.get(proxy + url, {responseType: 'text'}).toPromise()
      .then(response => {
        this.parseEventsFromXmlToJson(response);
      });
  }

  parseEventsFromXmlToJson(response: string) {
    const doc = this.domParser.parseFromString(response, 'text/xml');
    const eventsAsXml = Array.from(doc.getElementsByTagName('Event')) as Element[];
    const PeronsAsXml = Array.from(doc.getElementsByTagName('Person')) as Element[];
    const roomsAsXml = Array.from(doc.getElementsByTagName('Room')) as Element[];

    // parse room infos from xml
    roomsAsXml.forEach(roomAsXml => {
      const key = roomAsXml.getAttribute('key');
      const room = new Room();
      room.name = roomAsXml.getElementsByTagName('name')[0].firstChild.nodeValue;
      room.address = roomAsXml.getElementsByTagName('address')[0].firstChild.nodeValue;
      this.rooms[key] = room;
    });

    // parse contact infos from xml
    PeronsAsXml.forEach(personAsXml => {
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
      let ort;
      if ((ort = location.getElementsByTagName('ort')).length > 0) {
        person.contact.ort = ort[0].firstChild.nodeValue;
      }
      let office;
      if ((office = location.getElementsByTagName('office')).length > 0) {
        person.contact.office = office[0].firstChild.nodeValue;
      }
      let street;
      if ((street = location.getElementsByTagName('street')).length > 0) {
        person.contact.street = street[0].firstChild.nodeValue;
      }
      let tel;
      if ((tel = location.getElementsByTagName('tel')).length > 0) {
        person.contact.tel = tel[0].firstChild.nodeValue;
      }
      this.persons[key] = person;
    });
    // parse event infos from xml
    eventsAsXml.forEach(eventAsXml => {
      if (eventAsXml.getElementsByTagName('calendar')[0].firstChild.nodeValue === 'nein') {
        return;
      }
      const event = new UniEvent();
      const contactKey = (eventAsXml.getElementsByTagName('contact')[0].firstChild as Element).getAttribute('key');
      event.person = this.persons[contactKey];
      const roomKey = (eventAsXml.getElementsByTagName('room')[0].firstChild as Element).getAttribute('key');
      event.location = this.rooms[roomKey];
      let description;
      if ((description = eventAsXml.getElementsByTagName('description')).length > 0) {
        event.description = description[0].firstChild.nodeValue.replace(/\n\s*\n\s*\n/g, '\n\n');
      }
      event.endDate = eventAsXml.getElementsByTagName('enddate')[0].firstChild.nodeValue;
      event.endTime = eventAsXml.getElementsByTagName('endtime')[0].firstChild.nodeValue;
      // add '0' to time when time < 10H (e.g. 9:00...)
      if (event.endTime.length === 4 ) {
        event.endTime = '0' + event.endTime;
      }
      event.title = eventAsXml.getElementsByTagName('title')[0].firstChild.nodeValue;
      event.presenter = eventAsXml.getElementsByTagName('presenter')[0].firstChild.nodeValue;
      event.startDate = eventAsXml.getElementsByTagName('startdate')[0].firstChild.nodeValue;
      event.startTime = eventAsXml.getElementsByTagName('starttime')[0].firstChild.nodeValue;
      // add '0' to time when time < 10H (e.g. 9:00...)
      if (event.startTime.length === 4 ) {
        event.startTime = '0' + event.startTime;
      }
      this.events.push(event);
    });
    this.sortEvents(this.events);
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
