import { createTest, destroyVM } from '../util';
import systemSetting from '../../../src/modules/setting/systemSetting';

describe('systemSetting', () => {
  let vm;
  afterEach(() => {
    destroyVM(vm);
  });

  it('create', () => {
    vm = createTest(systemSetting, true);
    expect(vm.$el).toExist();
  });
});

