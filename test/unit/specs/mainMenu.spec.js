import { createTest, destroyVM } from '../util';
import mainMenu from '../../../src/components/mainMenu';

describe('mainMenu', () => {
  let vm;
  afterEach(() => {
    destroyVM(vm);
  });

  it('create', () => {
    vm = createTest(mainMenu, true);
    expect(vm.$el).toExist();
  });
});

