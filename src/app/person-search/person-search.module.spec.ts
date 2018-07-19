import { PersonSearchModule } from './person-search.module';

describe('PersonSearchModule', () => {
  let personSearchModule: PersonSearchModule;

  beforeEach(() => {
    personSearchModule = new PersonSearchModule();
  });

  it('should create an instance', () => {
    expect(personSearchModule).toBeTruthy();
  });
});
