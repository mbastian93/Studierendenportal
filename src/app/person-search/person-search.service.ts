import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Person} from '../models/person';


const proxy = 'https://cors-anywhere.herokuapp.com/';
const url = 'https://univis.uni-mainz.de/prg?search=persons&show=xml';

@Injectable({
  providedIn: 'root'
})
export class PersonSearchService {

  foundPersons: Person[] = [];
  private domParser: DOMParser = new DOMParser();
  constructor(
    private http: HttpClient,
  ) { }

  findPersons(name: string) {
    // find person whose name is or begins with '$name'
    this.http.get(proxy + url + '&fullname=' + name, {responseType: 'text'})
      .toPromise()
      .then( response => {
        this.parsePersonsFromXmlToJson(response);
      });
  }

  private parsePersonsFromXmlToJson(response: string) {
    const personsAsXml = Array.from(this.domParser.parseFromString(response, 'text/xml').getElementsByTagName('Person')) as Element[];
    // return when response doesn't contain any results
    if (personsAsXml.length === 0) { return; }
    personsAsXml.forEach(personAsXml => {
      const person = new Person();
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
        this.foundPersons.push(person);
        return;
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
      this.foundPersons.push(person);
    });
  }
}
