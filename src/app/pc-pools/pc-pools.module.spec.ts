import { PcPoolsModule } from './pc-pools.module';

describe('PcPoolsModule', () => {
  let pcPoolsModule: PcPoolsModule;

  beforeEach(() => {
    pcPoolsModule = new PcPoolsModule();
  });

  it('should create an instance', () => {
    expect(pcPoolsModule).toBeTruthy();
  });
});
