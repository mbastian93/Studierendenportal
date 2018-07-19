import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule} from '@angular/core';
import {HttpClientModule, HttpClient} from '@angular/common/http';
import {DomSanitizer} from '@angular/platform-browser';

/* App root */
import {AppComponent} from './app.component';

/* Feature Modules */
import {CoreModule} from './core/core.module';
import {IndexComponent} from './index/index.component';
import {NewsFeedModule} from './news-feed/news-feed.module';
import {MapModule} from './map/map.module';
import {BusScheduleModule} from './bus-schedule/bus-schedule.module';
import {MaterialModule} from './material/material.module';
import {PersonSearchModule} from './person-search/person-search.module';


/* Routing Module */
import {AppRoutingModule} from './app-routing.module';

import {MatIconRegistry} from '@angular/material';

import {ServiceWorkerModule} from '@angular/service-worker';
import {environment} from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    CoreModule,
    MaterialModule,
    NewsFeedModule,
    MapModule,
    BusScheduleModule,
    PersonSearchModule,
    ServiceWorkerModule.register('/Studierendenportal/ngsw-worker.js', {enabled: environment.production})
    // ServiceWorkerModule.register('ngsw-worker.js', {enabled: environment.production})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    iconRegistry
      .addSvgIcon('news',
      sanitizer.bypassSecurityTrustResourceUrl('assets/icons/newspaper.svg'))
      .addSvgIcon('searchPerson',
        sanitizer.bypassSecurityTrustResourceUrl('assets/icons/search.svg'))
      .addSvgIcon('home',
        sanitizer.bypassSecurityTrustResourceUrl('assets/icons/home.svg'))
      .addSvgIcon('map',
        sanitizer.bypassSecurityTrustResourceUrl('assets/icons/map.svg'))
      .addSvgIcon('bus',
        sanitizer.bypassSecurityTrustResourceUrl('assets/icons/bus-clock.svg'))
      .addSvgIcon('email',
        sanitizer.bypassSecurityTrustResourceUrl('assets/icons/email.svg'))
      .addSvgIcon('phone',
        sanitizer.bypassSecurityTrustResourceUrl('assets/icons/phone.svg'))
      .addSvgIcon('fax',
        sanitizer.bypassSecurityTrustResourceUrl('assets/icons/fax.svg'))
      .addSvgIcon('room',
        sanitizer.bypassSecurityTrustResourceUrl('assets/icons/home-map-marker.svg'))
      .addSvgIcon('person',
        sanitizer.bypassSecurityTrustResourceUrl('assets/icons/account.svg'));
  }
}
