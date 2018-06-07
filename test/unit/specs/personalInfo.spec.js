import { createTest, destroyVM } from '../util';
import personalInfo from '../../../src/modules/setting/personalInfo';

describe('personalInfo', () => {
  let vm;
  afterEach(() => {
    destroyVM(vm);
  });

  it('create', () => {
    vm = createTest(personalInfo, true);
    expect(vm.$el).toExist();
  });
});

