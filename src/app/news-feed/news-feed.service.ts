import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
// import models
import {RSSFeed} from '../models/r-s-s-feed';
import {Feed} from '../models/feed';
import {FeedDetails} from '../models/feed-details';
import {FeedPost} from '../models/feedPost';


// list all sources, must point to RSS feed
// remove proxy when using production
const proxy = 'https://cors-anywhere.herokuapp.com/';
// const proxy = 'https://crossorigin.me/';
const feedSources: RSSFeed[] = [
  {name: 'JGU Aktuell', url: 'https://www.uni-mainz.de/32.php'},
  {name: 'ZDV', url: 'https://www.zdv.uni-mainz.de/feed/'},
];

@Injectable({
  providedIn: 'root'
})
export class NewsFeedService {

  feedsAsJSON: Feed[] = [];
  private DOMParser: DOMParser = new DOMParser();

  constructor(
    private http: HttpClient
  ) { }

  // fetch feed from source
  getNewsFromFeed(url: string): Observable<string> {
    return this.http.get(proxy + url, {responseType: 'text'});
  }

  // fetch news from all feeds listed in feedSources and then parse from XML/RSS to JSON
  getNews() {
    // return when news already fetched
    if (this.feedsAsJSON.length > 0) {
      return;
    }
    feedSources.forEach((source) => {
      this.getNewsFromFeed(source.url).toPromise()
        .then(response => {
          this.parseFeedFromXmlToJson(response, source.name);
        });
    });
  }

// parse XML feed from string to JSON
  parseFeedFromXmlToJson(feedAsString: string, feedName: string) {
    // initialize parameters
    const feedAsJson: Feed = new Feed(feedName);
    const details = new FeedDetails();
    const feedAsXml = this.DOMParser.parseFromString(feedAsString, 'application/xml');
    const docRoot = feedAsXml.getElementsByTagName('channel')[0] as Element;
    const feedItems = Array.from(docRoot.getElementsByTagName('item')) as Element[];

    // parse description for Feed
    details.title = docRoot.getElementsByTagName('title')[0].firstChild.nodeValue;
    details.link = docRoot.getElementsByTagName('link')[0].firstChild.nodeValue;
    // check for description and parse
    let description;
    if ((description = docRoot.getElementsByTagName('description')).length > 0 && description.firstChild) {
      details.description = description[0].firstChild.nodeValue;
    }
    details.language = docRoot.getElementsByTagName('language')[0].firstChild.nodeValue;

    let copyright;
    if ((copyright = docRoot.getElementsByTagName('copyright')).length) {
      details.copyright = copyright[0].firstChild.nodeValue;
    }
    details.pubDate = docRoot.getElementsByTagName('pubDate')[0].firstChild.nodeValue;
    feedAsJson.details = details;

    feedItems.forEach((item) => {
      // parse items from feed
      const feedItem: FeedPost = new FeedPost();
      const categories = Array.from(item.getElementsByTagName('category')) as Element[];
      feedItem.title = item.getElementsByTagName('title')[0].firstChild.nodeValue;
      feedItem.description = item.getElementsByTagName('description')[0].firstChild.nodeValue;
      feedItem.link = item.getElementsByTagName('link')[0].firstChild.nodeValue;
      // feedItem.author = feedItems[i] as Element).getElementsByTagName('author')[0].firstChild.nodeValue;
      // feedItem.guid = item.getElementsByTagName('guid')[0].firstChild.nodeValue;
      feedItem.pubDate = item.getElementsByTagName('pubDate')[0].firstChild.nodeValue;

      if (categories) {
        categories.forEach((category) => {
          feedItem.categories.push(category.firstChild.nodeValue);
        });
      }
      // push item to feed
      feedAsJson.items.push(feedItem);
    });
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

