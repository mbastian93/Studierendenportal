import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PcPoolsComponent} from './pc-pools-component/pc-pools.component';
import {MaterialModule} from '../material/material.module';
import {Route, RouterModule} from '@angular/router';


const routes: Route[] = [
  {path: '', component: PcPoolsComponent}
  ];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MaterialModule
  ],
  declarations: [PcPoolsComponent]
})
export class PcPoolsModule { }
