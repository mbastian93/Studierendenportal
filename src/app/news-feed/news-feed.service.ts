import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
// import models
import {RssFeedSource} from '../models/rss-feed-source';
import {Feed} from '../models/feed';
import {FeedPost} from '../models/feedPost';

declare var require: any;

// remove proxy when using production
const proxy = 'https://cors-anywhere.herokuapp.com/';

@Injectable({
  providedIn: 'root'
})
export class NewsFeedService {

  feedsAsJSON: Feed[] = [];
  private feedSources = require('./RssFeeds.json') as RssFeedSource[];

  constructor(
    private http: HttpClient
  ) { }

  getFeedSources(): RssFeedSource[] {
    return this.feedSources;
  }

  // fetch feed from source
  getNewsFromFeed(url: string): Observable<string> {
    return this.http.get(proxy + url, {responseType: 'text'});
  }

// parse XML feed from string to JSON
  parseFeedFromXmlToJson(feedAsString: string, feedName: string) {
    // initialize parameters
    const feedAsJson: Feed = new Feed(feedName);
    const feedAsXml = new DOMParser().parseFromString(feedAsString, 'application/xml');
    const feedItems = (feedAsXml.getElementsByTagName('item'));

    for (let index = 0; index < feedItems.length; index++) {
      // parse items from feed
      const feedItem: FeedPost = new FeedPost();
      const itemAsXml = feedItems.item(index);
      const categories = itemAsXml.getElementsByTagName('category');
      feedItem.title = itemAsXml.getElementsByTagName('title')[0].firstChild.nodeValue;
      feedItem.description = itemAsXml.getElementsByTagName('description')[0].firstChild.nodeValue;
      feedItem.link = itemAsXml.getElementsByTagName('link')[0].firstChild.nodeValue;
      feedItem.pubDate = itemAsXml.getElementsByTagName('pubDate')[0].firstChild.nodeValue;

      for (let catIndex = 0; catIndex < categories.length; catIndex++) {
          feedItem.categories.push(categories[catIndex].firstChild.nodeValue);
      }
      // push item to feed
      feedAsJson.items.push(feedItem);
    }
    this.sortItems(feedAsJson);
    this.feedsAsJSON.push(feedAsJson);
  }

  // sort items of feed by date, newest first
  private sortItems(feed: Feed) {
    feed.items.sort((left, right): number => {
      if (Date.parse(left.pubDate) < Date.parse(right.pubDate)) {
        return 1;
      } else {
        return -1;
      }
    });
  }
}

