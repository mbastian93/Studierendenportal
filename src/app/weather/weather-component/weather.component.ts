import { Component, OnInit } from '@angular/core';
import {WeatherService} from '../weather.service';
import {Weather} from '../../models/weather';
import {Title} from '@angular/platform-browser';
import {ToolbarService} from '../../toolbar.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})
export class WeatherComponent implements OnInit {

  weather: Weather;
  private title = 'JGU Portal | Wetter';

  constructor(
    private weatherService: WeatherService,
    private titleService: Title,
    private toolbarService: ToolbarService
  ) { }

  ngOnInit() {
    this.weatherService.getWeather()
      .subscribe(response => this.weather = this.weatherService.parseWeatherData(response));
    this.setTitle();
  }

  private setTitle() {
    this.titleService.setTitle(this.title);
    this.toolbarService.setToolbarTitle(this.title);
  }
}
