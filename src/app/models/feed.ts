import { FeedDetails } from './feed-details';
import { FeedPost } from './feedPost';

/**
 * class representing Rss Feed
 * @param name: name of the feed
 * @param details: details and description of feed
 * @param items: items of feed
 */
export class Feed {
  name: string;
  details: FeedDetails;
  items: FeedPost[] = [];
  constructor(name: string) {
    this.name = name;
  }
}
