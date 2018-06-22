import { NewsFeedModule } from './news-feed.module';

describe('NewsFeedModule', () => {
  let newsFeedModule: NewsFeedModule;

  beforeEach(() => {
    newsFeedModule = new NewsFeedModule();
  });

  it('should create an instance', () => {
    expect(newsFeedModule).toBeTruthy();
  });
});
