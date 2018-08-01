import { Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {ToolbarService} from '../../toolbar.service';
import {CanteenService} from '../canteen.service';
import {Canteen} from '../../models/canteen';
import {MatOptionSelectionChange, MatTabChangeEvent} from '@angular/material';
import {Meal} from '../../models/meal';

@Component({
  selector: 'app-canteen',
  templateUrl: './canteen.component.html',
  styleUrls: ['./canteen.component.scss']
})
export class CanteenComponent implements OnInit {

  private title = 'JGU Portal | Mensapläne ';
  canteens: Canteen[];
  activeCanteen: Canteen;
  todaysMeals: Meal[];
  today: string;

  constructor(
    private titleService: Title,
    private toolbarService: ToolbarService,
    private canteenService: CanteenService
  ) { }

  ngOnInit() {
    this.setTitle();
    this.canteenService.fetchCanteenPlans();
    this.canteens = this.canteenService.getCanteenPlans();
  }

  private setTitle() {
    this.titleService.setTitle(this.title);
    this.toolbarService.setToolbarTitle(this.title);
  }

  handleSelect(event: MatOptionSelectionChange) {
    if (!event.isUserInput) {
      return;
    }
    if (this.activeCanteen === undefined) {
      this.activeCanteen = this.canteens[0];
    }
    this.todaysMeals = this.activeCanteen.getMealsForDay(event.source.value);

  }

  setActiveCanteen(event: MatTabChangeEvent) {
    this.activeCanteen = this.canteens[event.index];
    this.todaysMeals  =  this.activeCanteen.getMealsForDay(this.today);
  }
}
