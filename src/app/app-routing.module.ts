import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {NewsFeedComponent} from './news-feed/news-feed/news-feed.component';

// define the routes
const routes: Routes = [
  { path: '', redirectTo: 'Nachrichten', pathMatch: 'full' },
  { path: 'Nachrichten', component : NewsFeedComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class AppRoutingModule { }
