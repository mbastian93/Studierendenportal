import { Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {ToolbarService} from '../../toolbar.service';
import {CanteenService} from '../canteen.service';
import {Canteen, Counter} from '../../models/canteen';
import {MatOptionSelectionChange, MatTabChangeEvent} from '@angular/material';

@Component({
  selector: 'app-canteen',
  templateUrl: './canteen.component.html',
  styleUrls: ['./canteen.component.scss']
})
export class CanteenComponent implements OnInit {

  private title = 'JGU Portal | Mensapläne ';
  canteens: Canteen[] = [];
  activeCanteen: Canteen;
  counters: Counter[] = [];
  today: string;

  constructor(
    private titleService: Title,
    private toolbarService: ToolbarService,
    private canteenService: CanteenService
  ) { }

  ngOnInit() {
    this.setTitle();
    this.canteenService.getCanteenPlans()
      .subscribe(response => {
        this.canteens = this.canteenService.parseCanteenPlan(response);
      });
  }

  private setTitle() {
    this.titleService.setTitle(this.title);
    this.toolbarService.setToolbarTitle(this.title);
  }

  handleSelect(event: MatOptionSelectionChange) {
    if (!event.isUserInput) {
      return;
    }
    // set the first tab is active by default
    if (this.activeCanteen === undefined) {
      this.activeCanteen = this.canteens[0];
    }
    this.counters = this.activeCanteen.getMealsForDayByCounter(event.source.value);
  }

  // change the active canteen when switching tabs
  setActiveCanteen(event: MatTabChangeEvent) {
    this.activeCanteen = this.canteens[event.index];
    this.counters  =  this.activeCanteen.getMealsForDayByCounter(this.today);
  }
}
