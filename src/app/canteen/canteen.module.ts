import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CanteenComponent} from './canteen-component/canteen.component';
import {RouterModule, Routes} from '@angular/router';
import {MaterialModule} from '../material/material.module';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';



const routes: Routes = [
  {path: '', component: CanteenComponent}
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MaterialModule,
    ReactiveFormsModule,
    FormsModule
  ],
  declarations: [CanteenComponent]
})
export class CanteenModule {
}
