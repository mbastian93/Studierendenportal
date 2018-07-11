import {Component, Inject, OnInit} from '@angular/core';
import {MatBottomSheetRef} from '@angular/material';
import {MAT_BOTTOM_SHEET_DATA } from '@angular/material';

@Component({
  selector: 'app-news-feed',
  template: '<mat-nav-list>\n' +
  '  <a href="{{ data.item.link }}" mat-list-item>\n' +
  '    <span mat-line>Seite öffnen</span>\n' +
  '  </a>\n' +
  '</mat-nav-list>',
})
export class NewsFeedSheetComponent implements OnInit {

  constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any,
  private bottomSheetRef: MatBottomSheetRef<NewsFeedSheetComponent> ) { }

  ngOnInit() { }
}
