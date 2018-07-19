import {Component, OnInit} from '@angular/core';
import {NewsFeedService} from '../news-feed.service';
import {Feed} from '../../models/feed';
import {MatBottomSheet} from '@angular/material';
import {NewsFeedSheetComponent} from './news-feed-sheet.component';
import {FeedPost} from '../../models/feedPost';
import {Title} from '@angular/platform-browser';
import {ToolbarService} from '../../toolbar.service';

@Component({
  selector: 'app-news-feed',
  templateUrl: './news-feed.component.html',
  styleUrls: ['./news-feed.component.scss']
})
export class NewsFeedComponent implements OnInit {

  private title = 'JGU Portal | Nachrichten';
  feeds: Feed[];

  constructor(
    private titleService: Title,
    private toolbarService: ToolbarService,
    private feedService: NewsFeedService,
    private bottomSheet: MatBottomSheet
  ) {
  }

  ngOnInit() {
    this.getFeeds();
    this.setTitle();
  }

  getFeeds() {
    this.feedService.getNews();
    this.feeds = this.feedService.feedsAsJSON;
  }

  // open link directly only on devices without touch
  openLinkForItem(item: FeedPost) {
    if (window.ontouchstart === undefined) {
      window.open(item.link);
    } else {
      this.bottomSheet.open(NewsFeedSheetComponent, {data: {item: item}});
    }
  }

  private setTitle() {
    this.titleService.setTitle(this.title);
    this.toolbarService.changeToolbarTitle(this.title);
  }
}
