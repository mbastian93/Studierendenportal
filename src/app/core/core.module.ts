import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';

import { NewsFeedService } from '../news-feed/news-feed.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [
    NewsFeedService
  ]
})
export class CoreModule {
  constructor (@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error(
        'CoreModule is already loaded. Import it in the AppModule only');
    }
  }
}
