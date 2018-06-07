import { createTest, destroyVM } from '../util';
import equipmentManage from '../../../src/modules/setting/equipmentManage';

describe('equipmentManage', () => {
  let vm;
  afterEach(() => {
    destroyVM(vm);
  });

  it('create', () => {
    vm = createTest(equipmentManage, true);
    expect(vm.$el).toExist();
  });
});

