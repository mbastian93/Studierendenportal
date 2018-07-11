import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule} from '@angular/core';
import {HttpClientModule, HttpClient} from '@angular/common/http';
import {DomSanitizer} from '@angular/platform-browser';

/* App root */
import {AppComponent} from './app.component';

/* Feature Modules */
import {CoreModule} from './core/core.module';
import {NewsFeedModule} from './news-feed/news-feed.module';
import {MapModule} from './map/map.module';

import {NewsFeedService} from './news-feed/news-feed.service';
import { MapService } from './map/map.service';

/* Routing Module */
import {AppRoutingModule} from './app-routing.module';

import {
  MatToolbarModule,
  MatSidenavModule,
  MatIconModule,
  MatCardModule,
  MatListModule,
  MatButtonModule,
  MatButtonToggleModule, MatIconRegistry
} from '@angular/material';

import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { IndexComponent } from './index/index.component';

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
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatCardModule,
    MatIconModule,
    MatListModule,
    MatButtonModule,
    MatButtonToggleModule,
    NewsFeedModule,
    MapModule,
    ServiceWorkerModule.register('/Studierendenportal/ngsw-worker.js', { enabled: environment.production })
    // ServiceWorkerModule.register('ngsw-worker.js', {enabled: environment.production})
  ],
  providers: [NewsFeedService, MapService],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    iconRegistry.addSvgIcon(
      'news',
      sanitizer.bypassSecurityTrustResourceUrl('assets/icons/newspaper.svg'))
      .addSvgIcon('searchPerson',
        sanitizer.bypassSecurityTrustResourceUrl('assets/icons/search.svg'))
      .addSvgIcon('home',
        sanitizer.bypassSecurityTrustResourceUrl('assets/icons/home.svg'))
      .addSvgIcon('map',
        sanitizer.bypassSecurityTrustResourceUrl('assets/icons/map.svg'))
      .addSvgIcon('bus',
        sanitizer.bypassSecurityTrustResourceUrl('assets/icons/bus-clock.svg'));
  }
}
