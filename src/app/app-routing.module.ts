import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {IndexComponent} from './index/index.component';


// define the routes
const routes: Routes = [
  {path: '', component: IndexComponent},
  {path: 'Start', component: IndexComponent},
  {path: 'Nachrichten', loadChildren: './news-feed/news-feed.module#NewsFeedModule'},
  {path: 'Campus-Karte', loadChildren: './map/map.module#MapModule'},
  {path: 'Busfahrpläne', loadChildren: './bus-schedule/bus-schedule.module#BusScheduleModule'},
  {path: 'Personensuche', loadChildren: './person-search/person-search.module#PersonSearchModule'},
  {path: '**', component: IndexComponent}
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
export class AppRoutingModule {
}
