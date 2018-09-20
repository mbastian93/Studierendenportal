import { Component, OnInit } from '@angular/core';
import {ToolbarService} from '../../toolbar.service';
import {Title} from '@angular/platform-browser';
import {PcPoolsService} from '../pc-pools.service';
import {ComputePool} from '../../models/computePool';

@Component({
  selector: 'app-pc-pools',
  templateUrl: './pc-pools.component.html',
  styleUrls: ['./pc-pools.component.scss']
})
export class PcPoolsComponent implements OnInit {

  private title = 'JGU Portal | PC Pools';
  pcPools: ComputePool[] = [];

  constructor(
    private titleService: Title,
    private toolbarService: ToolbarService,
    private pcPoolsService: PcPoolsService
  ) { }

  ngOnInit() {
    this.setTitle();
    this.pcPools = this.pcPoolsService.getComputePools();
  }

  private setTitle() {
    this.titleService.setTitle(this.title);
    this.toolbarService.setToolbarTitle(this.title);
  }
}
