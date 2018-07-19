import {Injectable} from '@angular/core';
import {BusStop} from '../models/busStop';
import {Observable} from 'rxjs/';
import {DepartureBoard} from '../models/departureBoard';
import {HttpClient, HttpHeaders} from '@angular/common/http';

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

  private busStations = require('./busStops.json') as BusStop[];

  constructor(
    private http: HttpClient
  ) {
  }

  getDepartureBoardForStation(stationID: number): Observable<DepartureBoard> {
    const reqString = url + '&id=' + stationID.toString();
    return this.http.get<DepartureBoard>(proxy + reqString);
  }

  fetchDepartureBoards(): BusStop[] {
      this.busStations.forEach(station => {
          this.getDepartureBoardForStation(station.id).subscribe(
            departureBoard => {
              station.departureBoard = departureBoard;
            });
        });
    return this.busStations;
  }
}
