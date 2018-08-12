import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Office} from '../models/office';
import {Observable} from 'rxjs';
import {e} from '../../../node_modules/@angular/core/src/render3';

const proxy = 'https://cors-anywhere.herokuapp.com/';
const url = 'https://univis.uni-mainz.de/prg?search=departments&show=xml&number=';

const departments = [
  {name: 'Zentrum für Datenverarbeitung', orgNumber: '30400043'},
  {name: 'Universitätsbibliothek', orgNumber: '30101020'}
];

@Injectable({
  providedIn: 'root'
})
export class OfficeHoursService {

  constructor(
    private http: HttpClient
  ) { }

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
            office.exceptions = {startTime: start, endTime: end, comment: comment};
            return;
          } else {
            return;
          }
        }
        const startTime = officeHourAsXml.getElementsByTagName('starttime')[0].firstChild.nodeValue;
        const endTime = officeHourAsXml.getElementsByTagName('endtime')[0].firstChild.nodeValue;
        const days = (officeHourAsXml.getElementsByTagName('repeat')[0].firstChild.nodeValue).split(',');
        days[0] = days[0].replace('w1 ', '');
        days.forEach(day => {
          // add opening hours to day
          office.openingHoursForDays.get(+day).push({startTime: startTime, endTime: endTime, comment: ''});
        });
      });
      // add office to response object
      offices.push(office);
    });
    return offices;
  }

  getOpeningHours(): Observable<string> {
    return this.http.get(proxy + url + '30101020', {responseType: 'text'});
  }
}
