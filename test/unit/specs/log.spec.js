import { createTest, destroyVM } from '../util';
import log from '../../../src/modules/setting/log';

describe('log', () => {
  let vm;
  afterEach(() => {
    destroyVM(vm);
  });

  it('create', () => {
    vm = createTest(log, true);
    expect(vm.$el).toExist();
  });
});

