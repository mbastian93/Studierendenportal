import {Component, OnInit} from '@angular/core';
import {ToolbarService} from './toolbar.service';
import {JwksValidationHandler, OAuthService} from 'angular-oauth2-oidc';
import {authConfig} from './auth.config';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = '';
  subscription: EventListener;

  constructor(
    private ts: ToolbarService,
    private oauthService: OAuthService
  ) {
      // this.configureWithNewConfigApi();
  }

  ngOnInit() {
    this.subscription = this.ts.getEmittedValue()
      .subscribe(title => {
        this.title = title;
      });
  }

  private configureWithNewConfigApi() {
    this.oauthService.configure(authConfig);
    this.oauthService.tokenValidationHandler = new JwksValidationHandler();
    this.oauthService.loadDiscoveryDocumentAndLogin();
  }
}
