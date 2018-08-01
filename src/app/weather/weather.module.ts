import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Route, RouterModule} from '@angular/router';
import {WeatherComponent} from './weather-component/weather.component';
import {MaterialModule} from '../material/material.module';

const routes: Route[] = [
  {path: '', component: WeatherComponent}
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MaterialModule
  ],
  declarations: [WeatherComponent]
})
export class WeatherModule { }
