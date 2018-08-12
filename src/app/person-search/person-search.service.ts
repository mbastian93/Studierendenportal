import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Person} from '../models/person';
import {Observable} from 'rxjs';


const proxy = 'https://cors-anywhere.herokuapp.com/';
const url = 'https://univis.uni-mainz.de/prg?search=persons&show=xml';
const personUrl = 'https://univis.uni-mainz.de/prg?show=xml&key=749/persons/2017w:';

@Injectable({
  providedIn: 'root'
})
export class PersonSearchService {

  private domParser: DOMParser = new DOMParser();

  constructor(
    private http: HttpClient,
  ) {  }

  findPersons(name: string): Observable<string> {
    // find person whose name is or begins with '$name'
    return this.http.get(proxy + url + '&fullname=' + name, {responseType: 'text'});
  }

  // search for person by ID
  getPerson(id: string): Observable<string> {
    // replace all '.' in ID with '/'
    const ref = id.replace('Person.', '').split('.').join('/');
    return this.http.get(proxy + personUrl + ref, {responseType: 'text'});
  }

  parsePersonsFromXmlToJson(response: string): Person[] {
    const foundPersons: Person[] = [];
    const personsAsXml = Array.from(this.domParser.parseFromString(response, 'text/xml')
      .getElementsByTagName('Person')) as Element[];
    // return when response doesn't contain any results
    if (personsAsXml.length === 0) {
      return foundPersons;
    }
    personsAsXml.forEach(personAsXml => {
      const key = personAsXml.getAttribute('key');
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
      if (location === undefined) {
        foundPersons.push(person);
        return foundPersons;
      }
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
      foundPersons.push(person);
    });
    return foundPersons;
  }
}
