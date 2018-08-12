import { LibraryIdModule } from './library-id.module';

describe('LibraryIdModule', () => {
  let libraryIdModule: LibraryIdModule;

  beforeEach(() => {
    libraryIdModule = new LibraryIdModule();
  });

  it('should create an instance', () => {
    expect(libraryIdModule).toBeTruthy();
  });
});
