import { CommonModule } from '@angular/common';
import { NgModule, Optional, SkipSelf } from '@angular/core';

import { NewsFeedService } from '../news-feed/news-feed.service';
import {MapService} from '../map/map.service';
import {BusScheduleService} from '../bus-schedule/bus-schedule.service';
import {ToolbarService} from '../toolbar.service';
import {PersonSearchService} from '../person-search/person-search.service';
import {CalendarService} from '../calendar/calendar.service';
import {WeatherService} from '../weather/weather.service';
import {OfficeHoursService} from '../office-hours/office-hours.service';
import {LibraryIdService} from '../library-id/library-id.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [
    ToolbarService,
    NewsFeedService,
    MapService,
    BusScheduleService,
    PersonSearchService,
    CalendarService,
    WeatherService,
    OfficeHoursService,
    LibraryIdService
  ]
})
export class CoreModule {
  constructor (@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error(
        'CoreModule is already loaded. Import it in the AppModule only');
    }
  }
}
