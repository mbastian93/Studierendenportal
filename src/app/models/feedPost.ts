export class FeedPost {

  title: string;
  description: string; link: string;
  author: string;
  guid: string;
  pubDate: string;
  categories: string[];

  constructor() {
    this.categories = [];
  }
}
