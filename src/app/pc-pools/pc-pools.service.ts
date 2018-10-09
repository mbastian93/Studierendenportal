import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {ComputePool} from '../models/computePool';

declare var require: any;
const proxy = 'https://cors-anywhere.herokuapp.com/';
const url = 'https://pool-use.webapi.jgu.net/';

@Injectable({
  providedIn: 'root'
})
export class PcPoolsService {

  private pcPools = require('./compute-pools.json') as ComputePool[];

  constructor(
    private http: HttpClient
  ) {  }

  getComputePools(): Observable<ComputePool[]> {
    return this.http.get<ComputePool[]>(proxy + url)
      .pipe(
        map(computePools => this.addDetailsToComputePools(computePools))
      );
  }

  private addDetailsToComputePools(computePools: ComputePool[]) {
    this.pcPools.forEach(pool => {
      computePools.forEach(computePool => {
        if (pool.roomName === computePool.roomName) {
          pool.events = computePool.events;
        }
      });
    });
    return this.pcPools;
  }

}
