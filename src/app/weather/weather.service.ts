import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Weather} from '../models/weather';
import {Observable} from 'rxjs';

const proxy = 'https://cors-anywhere.herokuapp.com/';
const url = 'http://wetter.physik.uni-mainz.de/karlscam/wetter.xml';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(
    private http: HttpClient
  ) { }

  getWeather(): Observable<string> {
    return this.http.get(proxy + url, { responseType: 'text' } );
  }

  parseWeatherData(response: string): Weather {
    const weather: Weather = new Weather();
    const domParser = new DOMParser();
    const weatherDoc = domParser.parseFromString(response, 'text/xml');
    weather.date = weatherDoc.getElementsByTagName('Datum')[0].firstElementChild.firstChild.nodeValue.trim();
    weather.time = weatherDoc.getElementsByTagName('Uhrzeit')[0].firstElementChild.firstChild.nodeValue.trim();
    weather.temperature = weatherDoc.getElementsByTagName('Temperatur')[0].firstElementChild.firstChild.nodeValue.trim();
    weather.airPressure = weatherDoc.getElementsByTagName('Luftdruck')[0].firstElementChild.firstChild.nodeValue.trim();
    weather.humidity = weatherDoc.getElementsByTagName('Luftfeuchte')[0].firstElementChild.firstChild.nodeValue.trim();
    weather.windSpeed = weatherDoc.getElementsByTagName('Windgeschwindigkeit')[0].firstElementChild.firstChild.nodeValue.trim();
    weather.windDirection = weatherDoc.getElementsByTagName('Windrichtung')[0].firstElementChild.firstChild.nodeValue.trim();
    return weather;
  }
}
