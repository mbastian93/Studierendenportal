import { Component, OnInit } from '@angular/core';
import {Title} from '@angular/platform-browser';
import {ToolbarService} from '../../toolbar.service';
import {CalendarService} from '../calendar.service';
import {UniEvent} from '../../models/event';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {

  private title = 'JGU Portal | Veranstaltungen';
  events: UniEvent[];
  mobile: boolean;
  panelOpenState = false;
  constructor(
    private titleService: Title,
    private toolbarService: ToolbarService,
    private calendarService: CalendarService
  ) { }

  ngOnInit() {
    this.setTitle();
    this.calendarService.getEvents()
      .subscribe(events => {
        this.events = this.calendarService.parseEventsFromXmlToJson(events);
      });
    this.events = this.calendarService.events;
    this.mobile = window.screen.width <= 768;
  }

  private setTitle() {
    this.titleService.setTitle(this.title);
    this.toolbarService.setToolbarTitle(this.title);
  }
}
