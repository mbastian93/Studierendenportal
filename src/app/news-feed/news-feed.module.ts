import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsFeedComponent } from './news-feed/news-feed.component';
import {
  MatSelectModule,
  MatCardModule,
  MatChipsModule,
  MatButtonModule,
  MatListModule,
  MatBottomSheetModule
} from '@angular/material';
import { NewsFeedSheetComponent } from './news-feed/news-feed-sheet.component';

@NgModule({
  imports: [
    CommonModule,
    MatSelectModule,
    MatCardModule,
    MatChipsModule,
    MatButtonModule,
    MatListModule,
    MatBottomSheetModule
  ],
  declarations: [NewsFeedComponent, NewsFeedSheetComponent],
  bootstrap: [NewsFeedSheetComponent]
})
export class NewsFeedModule { }
