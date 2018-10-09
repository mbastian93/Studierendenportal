import { Component, OnInit } from '@angular/core';
import {Title} from '@angular/platform-browser';
import {ToolbarService} from '../../toolbar.service';
import {CalendarService} from '../calendar.service';
import {UniEvent} from '../../models/uniEvent';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {

  private title = 'JGU Portal | Veranstaltungen';
  events: UniEvent[] = [];
  constructor(
    private titleService: Title,
    private toolbarService: ToolbarService,
    private calendarService: CalendarService
  ) { }

  ngOnInit() {
    this.setTitle();
    if ((this.events = this.calendarService.getEvents()).length === 0 ) {
      this.calendarService.getEventsFromServer()
        .subscribe(events => {
          this.events = this.calendarService.parseEventsFromXmlToJson(events);
        });
    }
  }

  private setTitle() {
    this.titleService.setTitle(this.title);
    this.toolbarService.setToolbarTitle(this.title);
  }
}
