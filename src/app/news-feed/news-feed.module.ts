import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsFeedComponent,  } from './news-feed-component/news-feed.component';
import { NewsFeedSheetComponent } from './news-feed-component/news-feed-sheet.component';
import {
  MatSelectModule,
  MatCardModule,
  MatChipsModule,
  MatButtonModule,
  MatListModule,
  MatBottomSheetModule
} from '@angular/material';


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
