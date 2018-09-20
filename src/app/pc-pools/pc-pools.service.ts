import { Injectable } from '@angular/core';
import {ComputePool} from '../models/computePool';


declare var require: any;

@Injectable({
  providedIn: 'root'
})
export class PcPoolsService {

  private pcPools =  require('./compute-pools.json') as ComputePool[];

  constructor() { }

  getComputePools(): ComputePool[] {
    return this.pcPools;
  }

}
