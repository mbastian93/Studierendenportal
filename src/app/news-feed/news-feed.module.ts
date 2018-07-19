import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NewsFeedComponent} from './news-feed-component/news-feed.component';
import {NewsFeedSheetComponent} from './news-feed-component/news-feed-sheet.component';

import {RouterModule, Routes} from '@angular/router';
import {MaterialModule} from '../material/material.module';


const routes: Routes = [
  {path: '', component: NewsFeedComponent}
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MaterialModule
  ],
  declarations: [NewsFeedComponent, NewsFeedSheetComponent],
  bootstrap: [NewsFeedSheetComponent]
})
export class NewsFeedModule {
}
