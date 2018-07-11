import { CommonModule } from '@angular/common';
import { NgModule, Optional, SkipSelf } from '@angular/core';

import { NewsFeedService } from '../news-feed/news-feed.service';
import {MapService} from '../map/map.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [
    NewsFeedService,
    MapService
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
