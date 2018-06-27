import { FeedDetails } from './feed-details';
import { FeedItem } from './feedItem';

export class Feed {
  feedName: string;
  details: FeedDetails;
  items: FeedItem[];
  constructor(name: string) {
    this.feedName = name;
    this.items = [];
  }
}
