import { CoreModuleModule } from './core.module';

describe('CoreModuleModule', () => {
  let coreModuleModule: CoreModuleModule;

  beforeEach(() => {
    coreModuleModule = new CoreModuleModule();
  });

  it('should create an instance', () => {
    expect(coreModuleModule).toBeTruthy();
  });
});
