import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {OfficeHoursComponent} from './office-hours-component/office-hours.component';
import {RouterModule, Routes} from '@angular/router';
import {MaterialModule} from '../material/material.module';

const routes: Routes = [
  {path: '', component: OfficeHoursComponent}
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MaterialModule
  ],
  declarations: [
    OfficeHoursComponent
  ]
})
export class OfficeHoursModule { }
