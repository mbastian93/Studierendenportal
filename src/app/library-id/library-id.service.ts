import { Injectable } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BibId} from '../models/bibId';

const url = 'https://bibid.webapi.jgu.net';

@Injectable({
  providedIn: 'root'
})
export class LibraryIdService {

  constructor(
    private http: HttpClient,
    private oauthService: OAuthService
  ) { }

  getLibraryId(): Observable<BibId> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.oauthService.getAccessToken()
    });
    return this.http.get<BibId>(url, {headers: headers});
  }
}
