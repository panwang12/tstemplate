import { createTest, destroyVM } from '../util';
import roleManage from '../../../src/modules/setting/roleManage';

describe('roleManage', () => {
  let vm;
  afterEach(() => {
    destroyVM(vm);
  });

  it('create', () => {
    vm = createTest(roleManage, true);
    expect(vm.$el).toExist();
  });
});

