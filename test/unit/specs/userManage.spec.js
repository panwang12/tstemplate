import { createTest, destroyVM } from '../util';
import userManage from '../../../src/modules/setting/userManage';

describe('userManage', () => {
  let vm;
  afterEach(() => {
    destroyVM(vm);
  });

  it('create', () => {
    vm = createTest(userManage, true);
    expect(vm.$el).toExist();
  });
});

