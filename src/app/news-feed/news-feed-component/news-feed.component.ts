import {Component, OnInit} from '@angular/core';
import {NewsFeedService} from '../news-feed.service';
import {Feed} from '../../models/feed';
import {MatBottomSheet} from '@angular/material';
import {NewsFeedSheetComponent} from './news-feed-sheet.component';
import {FeedPost} from '../../models/feedPost';

@Component({
  selector: 'app-news-feed',
  templateUrl: './news-feed.component.html',
  styleUrls: ['./news-feed.component.scss']
})
export class NewsFeedComponent implements OnInit {

  activeSource: Feed;
  feeds: Feed[];

  constructor(
    private feedService: NewsFeedService,
    private bottomSheet: MatBottomSheet
  ) {
  }

  ngOnInit() {
    this.getFeeds();
  }

  getFeeds() {
    this.feedService.getNews();
    this.feeds = this.feedService.feedsAsJSON;
    this.activeSource = this.feedService.defaultFeed;
  }

  // switch source for feed when selected
  selectHandler(event: any) {
    this.activeSource = event.value;
  }

  // open link directly only on devices without touch
  openLinkForItem(item: FeedPost) {
    if (window.ontouchstart === undefined) {
      window.open(item.link);
    } else {
      this.bottomSheet.open(NewsFeedSheetComponent, {data: {item: item}});
    }
  }

}
