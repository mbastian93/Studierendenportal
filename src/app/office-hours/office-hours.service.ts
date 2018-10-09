import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Office} from '../models/office';
import {Observable} from 'rxjs';
import {Department} from '../models/department';
import {OfficeHour, Weekday} from '../models/officeHour';

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
    // get all offices
    const officesAsXml = new DOMParser().parseFromString(response, 'text/xml').getElementsByTagName('Person');
    // parse opening hours for each office
    for (let index = 0; index < officesAsXml.length; index++) {
      const officeAsXml = officesAsXml[index];
      // create office and set name
      const office = new Office();
      office.name = officeAsXml.getElementsByTagName('lastname')[0].firstChild.nodeValue;
      // get opening hours for office
      const officeHoursAsXml = officeAsXml.getElementsByTagName('officehour');
      for (let idx = 0; idx < officeHoursAsXml.length; idx++) {
        // parse opening hours
        const officeHourAsXml = officeHoursAsXml[idx];
        let startTime, startDay, endTime, endDay, comment: string;
        if (officeHourAsXml.getElementsByTagName('repeat').length === 0 ) {
          let temp;
          if ((temp = officeHourAsXml.getElementsByTagName('comment')).length > 0 ) {
            comment = temp[0].firstChild.nodeValue;
            if ((startTime = officeHourAsXml.getElementsByTagName('starttime')).length > 0 ) {
              startTime = startTime[0].firstChild.nodeValue || '';
            } else {
              startTime = '';
            }
            if ((endTime = officeHourAsXml.getElementsByTagName('endtime')).length > 0) {
              endTime = endTime[0].firstChild.nodeValue;
            } else {
              endTime = '';
            }
            office.exceptions = new OfficeHour(startTime, endTime, '', '', comment );
            continue;
          } else {
            continue;
          }
        }
        startTime = officeHourAsXml.getElementsByTagName('starttime')[0].firstChild.nodeValue;
        endTime = officeHourAsXml.getElementsByTagName('endtime')[0].firstChild.nodeValue;
        const days = (officeHourAsXml.getElementsByTagName('repeat')[0].firstChild.nodeValue as string).split(',');
        startDay =  Weekday[days[0].replace('w1 ', '')];
        endDay = Weekday[days[days.length - 1]];
        office.officeHours.push(new OfficeHour(startTime, endTime, startDay, endDay, comment ));
      }
      // add office to response object
      offices.push(office);
    }
    return offices;
  }

  getOpeningHoursForDepartment(department: Department ): Observable<string> {
    return this.http.get(proxy + url + department.orgNumber, {responseType: 'text'});
  }
}
