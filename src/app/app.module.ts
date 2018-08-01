import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {DomSanitizer} from '@angular/platform-browser';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
/* App root */
import {AppComponent} from './app.component';
import {IndexComponent} from './index/index.component';

/* Feature Modules */
import {CoreModule} from './core/core.module';
import {MaterialModule} from './material/material.module';

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
    ReactiveFormsModule,
    FormsModule,
    ServiceWorkerModule.register('https://mbastian93.github.io/Studierendenportal/ngsw-worker.js', {enabled: environment.production})
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
        sanitizer.bypassSecurityTrustResourceUrl('assets/icons/account.svg'))
      .addSvgIcon('calendar',
        sanitizer.bypassSecurityTrustResourceUrl('assets/icons/calendar.svg'))
      .addSvgIcon('info',
        sanitizer.bypassSecurityTrustResourceUrl('assets/icons/information-outline.svg'))
      .addSvgIcon('clock',
        sanitizer.bypassSecurityTrustResourceUrl('assets/icons/clock-outline.svg'))
      .addSvgIcon('marker',
        sanitizer.bypassSecurityTrustResourceUrl('assets/icons/map-marker.svg'))
      .addSvgIcon('meal',
        sanitizer.bypassSecurityTrustResourceUrl('assets/icons/food-fork-drink.svg'));
  }
}
