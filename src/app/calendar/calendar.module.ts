import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarComponent } from './calendar-component/calendar.component';

import {MaterialModule} from '../material/material.module';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {path: '', component: CalendarComponent}
  ];

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule.forChild(routes)
  ],
  declarations: [CalendarComponent]
})
export class CalendarModule { }
