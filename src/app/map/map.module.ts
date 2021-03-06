import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MapComponent} from './map-component/map.component';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';
import {MaterialModule} from '../material/material.module';

const routes: Routes = [
  {path: '', component: MapComponent}
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  declarations: [MapComponent]
})
export class MapModule {
}
