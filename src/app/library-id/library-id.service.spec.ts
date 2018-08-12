import { TestBed, inject } from '@angular/core/testing';

import { LibraryIdService } from './library-id.service';

describe('LibraryIdService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LibraryIdService]
    });
  });

  it('should be created', inject([LibraryIdService], (service: LibraryIdService) => {
    expect(service).toBeTruthy();
  }));
});
