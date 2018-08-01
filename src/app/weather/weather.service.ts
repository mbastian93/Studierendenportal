import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Weather} from '../models/weather';

const proxy = 'https://cors-anywhere.herokuapp.com/';
const url = 'http://wetter.physik.uni-mainz.de/karlscam/wetter.xml';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  weather: Weather = new Weather();

  constructor(
    private http: HttpClient
  ) { }

  getWeather() {
    this.http.get(proxy + url, { responseType: 'text' } )
      .toPromise()
      .then(response => {
        return this.parseWeatherData(response);
      });
  }

  private parseWeatherData(response: string) {
    const domParser = new DOMParser();
    const weatherDoc = domParser.parseFromString(response, 'text/xml');
    this.weather.date = weatherDoc.getElementsByTagName('Datum')[0].firstElementChild.firstChild.nodeValue.trim();
    this.weather.time = weatherDoc.getElementsByTagName('Uhrzeit')[0].firstElementChild.firstChild.nodeValue.trim();
    this.weather.temperature = weatherDoc.getElementsByTagName('Temperatur')[0].firstElementChild.firstChild.nodeValue.trim();
    this.weather.airPressure = weatherDoc.getElementsByTagName('Luftdruck')[0].firstElementChild.firstChild.nodeValue.trim();
    this.weather.humidity = weatherDoc.getElementsByTagName('Luftfeuchte')[0].firstElementChild.firstChild.nodeValue.trim();
    this.weather.windSpeed = weatherDoc.getElementsByTagName('Windgeschwindigkeit')[0].firstElementChild.firstChild.nodeValue.trim();
    this.weather.windDirection = weatherDoc.getElementsByTagName('Windrichtung')[0].firstElementChild.firstChild.nodeValue.trim();
  }
}
