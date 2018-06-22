import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsFeedComponent } from './news-feed/news-feed.component';
import { MatSelectModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    MatSelectModule
  ],
  declarations: [NewsFeedComponent]
})
export class NewsFeedModule { }
