import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ToolbarService} from './toolbar.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = '';
  subscription: EventListener;

  constructor(private ts: ToolbarService) {

  }

  ngOnInit() {
    this.subscription = this.ts.getEmittedValue()
      .subscribe(title => {
        this.title = title;
      });
  }
}
