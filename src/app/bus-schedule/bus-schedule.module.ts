import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BusScheduleComponent} from './bus-schedule-component/bus-schedule.component';
import {RouterModule, Routes} from '@angular/router';
import {MaterialModule} from '../material/material.module';

const routes: Routes = [
  {path: '', component: BusScheduleComponent}
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MaterialModule
  ],
  declarations: [BusScheduleComponent]
})
export class BusScheduleModule {
}
