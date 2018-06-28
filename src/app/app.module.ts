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

import {NewsFeedService} from './news-feed/news-feed.service';

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

@NgModule({
  declarations: [
    AppComponent,
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
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [NewsFeedService],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    iconRegistry.addSvgIcon(
      'news',
      sanitizer.bypassSecurityTrustResourceUrl('assets/icons/newspaper.svg'))
      .addSvgIcon('searchPerson',
        sanitizer.bypassSecurityTrustResourceUrl('assets/icons/account-search-outline.svg'));
  }
}
