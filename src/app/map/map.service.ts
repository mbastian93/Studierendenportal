import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

import {Building} from '../models/building';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  private buildingsURL = 'https://raeume.uni-mainz.de/aris-api/Building';

  constructor(
    private http: HttpClient
  ) { }

  getBuildingsList(): Observable<Building[]> {
    return this.http.get<Building[]>(this.buildingsURL);
  }
}
