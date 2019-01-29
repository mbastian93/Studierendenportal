import { Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {ToolbarService} from '../../toolbar.service';
import {CanteenService} from '../canteen.service';
import {Canteen} from '../../models/canteen';
import {MatOptionSelectionChange, MatTabChangeEvent} from '@angular/material';
import {Counter} from '../../models/counter';

@Component({
  selector: 'app-canteen',
  templateUrl: './canteen.component.html',
  styleUrls: ['./canteen.component.scss']
})
export class CanteenComponent implements OnInit {

  private title = 'JGU Portal | Mensapläne ';
  canteens: Canteen[] = [];
  selectedCanteen: Canteen;
  counters: Counter[] = [];
  selectedDay: string;

  constructor(
    private titleService: Title,
    private toolbarService: ToolbarService,
    private canteenService: CanteenService
  ) { }

  ngOnInit() {
    this.setTitle();
    if ((this.canteens = this.canteenService.canteens).length === 0) {
      this.canteenService.getCanteenPlans()
        .subscribe(response => {
          this.canteens = this.canteenService.parseCanteenPlan(response);
        });
    }
  }

  private setTitle() {
    this.titleService.setTitle(this.title);
    this.toolbarService.setToolbarTitle(this.title);
  }

  handleSelect(event: MatOptionSelectionChange) {
    if (!event.isUserInput) {
      return;
    }
    // set the first tab as active by default
    if (this.selectedCanteen === undefined) {
      this.selectedCanteen = this.canteens[0];
    }
    this.counters = this.selectedCanteen.getMealsForDayByCounter(event.source.value);
  }

  // change the active canteen when switching tabs
  setActiveCanteen(event: MatTabChangeEvent) {
    this.selectedCanteen = this.canteens[event.index];
    if (this.selectedDay !== undefined) {
      this.counters  =  this.selectedCanteen.getMealsForDayByCounter(this.selectedDay);
    }
  }
}
