import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewsFeedComponent } from './news-feed/news-feed-component/news-feed.component';
import {IndexComponent} from './index/index.component';
import {MapComponent} from './map/map-component/map.component';

// define the routes
const routes: Routes = [
  { path: '', component: IndexComponent},
  { path: 'Start', component: IndexComponent },
  { path: 'Nachrichten', component : NewsFeedComponent },
  { path: 'Campus-Karte', component: MapComponent }
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
