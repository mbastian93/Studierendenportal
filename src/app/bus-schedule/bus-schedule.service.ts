import {Injectable} from '@angular/core';
import {BusStop} from '../models/busStop';
import {Observable} from 'rxjs/';
import {DepartureBoard} from '../models/departureBoard';
import {HttpClient} from '@angular/common/http';

declare var require: any;

const proxy = 'https://cors-anywhere.herokuapp.com/';
const apiKey = 'accessId=26594e9d-0888-496c-a664-5b0b888f3882';
const format = '&format=json';
const maxLength = '&maxJourneys=10';
const url = 'https://www.rmv.de/hapi/departureBoard?' + apiKey + format + maxLength;

@Injectable({
  providedIn: 'root'
})
export class BusScheduleService {

  private busStops = require('./busStops.json') as BusStop[];

  constructor(
    private http: HttpClient
  ) {  }

  getDepartureBoardForStation(stationID: number): Observable<DepartureBoard> {
    return this.http.get<DepartureBoard>(proxy + url + `&id=${stationID}`);
  }

  getBusStops(): BusStop[] {
    return this.busStops;
  }
}
