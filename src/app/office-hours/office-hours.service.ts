import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Office, OfficeHour, Weekday} from '../models/office';
import {Observable} from 'rxjs';
import {Department} from '../models/department';

declare var require: any;

const proxy = 'https://cors-anywhere.herokuapp.com/';
const url = 'https://univis.uni-mainz.de/prg?search=departments&show=xml&number=';

@Injectable({
  providedIn: 'root'
})
export class OfficeHoursService {

  private departments = require('./Departments.json') as Department[];

  constructor(
    private http: HttpClient
  ) { }

  getDepartments(): Department[] {
    return this.departments;
  }

  parseOpeningHours(response: string): Office[] {
    // response object
    const offices = [];
    const domParser = new DOMParser().parseFromString(response, 'text/xml');
    // get all offices
    const officesAsXml = Array.from(domParser.getElementsByTagName('Person')) as Element[];
    // parse opening hours for each office
    officesAsXml.forEach(officeAsXml => {
      // create office and set name
      const office = new Office();
      office.name = officeAsXml.getElementsByTagName('lastname')[0].firstChild.nodeValue;
      // get opening hours for office
      const officeHoursAsXml = Array.from(officeAsXml.getElementsByTagName('officehour')) as Element[];
      officeHoursAsXml.forEach(officeHourAsXml => {
        // parse opening hours
        if (officeHourAsXml.getElementsByTagName('repeat').length === 0 ) {
          let comment, start, end;
          if ((comment = officeHourAsXml.getElementsByTagName('comment')).length > 0 ) {
            comment = comment[0].firstChild.nodeValue;
            if ((start = officeHourAsXml.getElementsByTagName('starttime')).length > 0 ) {
              start = start[0].firstChild.nodeValue || '';
            } else {
              start = '';
            }
            if ((end = officeHourAsXml.getElementsByTagName('endtime')).length > 0) {
              end = end[0].firstChild.nodeValue;
            } else {
              end = '';
            }
            office.exceptions = {days: [], startTime: start, endTime: end, comment: comment};
            return;
          } else {
            return;
          }
        }
        const officeHour = new OfficeHour();
        officeHour.startTime = officeHourAsXml.getElementsByTagName('starttime')[0].firstChild.nodeValue;
        officeHour.endTime = officeHourAsXml.getElementsByTagName('endtime')[0].firstChild.nodeValue;
        const days = (officeHourAsXml.getElementsByTagName('repeat')[0].firstChild.nodeValue).split(',');
        days[0] = days[0].replace('w1 ', '');
        days.forEach(day => {
          // add days hours for opening hour
          officeHour.days.push(Weekday[day]);
        });
        office.officeHours.push(officeHour);
      });
      // add office to response object
      offices.push(office);
    });
    return offices;
  }

  getOpeningHoursForDepartment(department: Department ): Observable<string> {
    return this.http.get(proxy + url + department.orgNumber, {responseType: 'text'});
  }
}
