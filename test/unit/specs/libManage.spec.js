import { createTest, destroyVM } from '../util';
import libManage from '../../../src/modules/setting/libManage';

describe('libManage', () => {
  let vm;
  afterEach(() => {
    destroyVM(vm);
  });

  it('create', () => {
    vm = createTest(libManage, true);
    expect(vm.$el).toExist();
  });
});

