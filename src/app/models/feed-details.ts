export class FeedDetails {
  title: string;
  link: string;
  description: string;
  language: string;
  copyright: string;
  pubDate: string;
  image: Image;
  constructor() {
    this.image = {} as Image;
  }
}

interface Image {
  url: string;
  title: string;
  link: string;
}
