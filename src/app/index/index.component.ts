import { Component, OnInit } from '@angular/core';
import {Title} from '@angular/platform-browser';
import {ToolbarService} from '../toolbar.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  private title = 'Studierendenportal';
  constructor(
    private titleService: Title,
    private toolbarService: ToolbarService
  ) { }

  ngOnInit() {
    this.titleService.setTitle(this.title);
    this.toolbarService.setToolbarTitle(this.title);
  }

}
