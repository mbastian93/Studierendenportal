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
    this.initBusStops();
    this.setTitle();
  }

  private setTitle() {
    this.titleService.setTitle(this.title);
    this.toolbarService.setToolbarTitle(this.title);
  }

  private initBusStops() {
    // get bus stops an corresponding departure boards
    this.busStops = this.busStopService.getBusStops();
    this.busStops.forEach(busStop => {
      this.busStopService.getDepartureBoardForStation(busStop.id)
        .subscribe(departureBoard => {
          busStop.departureBoard = departureBoard;
        });
    });
  }
}
