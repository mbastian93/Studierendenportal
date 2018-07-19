import {Component, OnInit} from '@angular/core';
import {BusStop} from '../../models/busStop';
import {BusScheduleService} from '../bus-schedule.service';
import {Title} from '@angular/platform-browser';
import {ToolbarService} from '../../toolbar.service';

@Component({
  selector: 'app-bus-stops',
  templateUrl: './bus-schedule.component.html',
  styleUrls: ['./bus-schedule.component.scss']
})
export class BusScheduleComponent implements OnInit {

  private title = 'JGU Portal | Busfahrpläne';
  busStops: BusStop[];
  displayedColumns: string[] = ['Abfahrt (geplant)', 'Abfahrt (aktuell)', 'Linie', 'Richtung'];
  constructor(
    private titleService: Title,
    private toolbarService: ToolbarService,
    private busStopService: BusScheduleService
  ) {
  }

  ngOnInit() {
    this. busStops = this.busStopService.fetchDepartureBoards();
    // refresh every 60 seconds
    /*
    setInterval(() => {
      this.busStops  = this.busStopService.fetchDepartureBoards();
    }, 60000);
    */
    this.setTitle();
  }

  private setTitle() {
    this.titleService.setTitle(this.title);
    this.toolbarService.changeToolbarTitle(this.title);
  }
}
