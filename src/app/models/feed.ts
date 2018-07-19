import { FeedDetails } from './feed-details';
import { FeedPost } from './feedPost';

export class Feed {
  feedName: string;
  details: FeedDetails;
  items: FeedPost[] = [];
  constructor(name: string) {
    this.feedName = name;
  }
}
