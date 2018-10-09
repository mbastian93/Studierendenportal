import { FeedPost } from './feedPost';

export class Feed {
  name: string;
  items: FeedPost[] = [];
  constructor(name: string) {
    this.name = name;
  }
}
