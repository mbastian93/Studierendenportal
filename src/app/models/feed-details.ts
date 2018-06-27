export class FeedDetails {
  title: string;
  link: string;
  description: string;
  language: string;
  copyright: string;
  pubDate: string;
  image: {
    url: string;
    title: string;
    link: string
  };
  constructor() {
    this.image = { url: '', title: '', link: ''};
  }
}
