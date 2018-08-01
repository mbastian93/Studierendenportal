import { CanteenModule } from './canteen.module';

describe('CanteenModule', () => {
  let canteenModule: CanteenModule;

  beforeEach(() => {
    canteenModule = new CanteenModule();
  });

  it('should create an instance', () => {
    expect(canteenModule).toBeTruthy();
  });
});
