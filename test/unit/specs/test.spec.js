import { createTest, destroyVM } from '../util';
import test from '../../../src/modules/test1212/test';

describe('test', () => {
  let vm;
  afterEach(() => {
    destroyVM(vm);
  });

  it('create', () => {
    vm = createTest(test, true);
    expect(vm.$el).toExist();
  });
});

