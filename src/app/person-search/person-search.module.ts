import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {PersonSearchComponent} from './person-search-component/person-search.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MaterialModule} from '../material/material.module';

const routes: Routes = [
  {path: '', component: PersonSearchComponent},
  {path: ':id', component: PersonSearchComponent}
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  declarations: [PersonSearchComponent]
})
export class PersonSearchModule {
}
