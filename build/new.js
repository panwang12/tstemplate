"use strict";
const path = require("path");
const fileSave = require("file-save");
const componentName = process.argv[2];

process.on("exit", () => {
  console.info();
});

let defaultPath = '../src/components'
let testDefaultPath = "../../../test/unit/specs";
if (!process.argv[2]) {
  console.error("[组件名]必填 - Please enter new component name");
  process.exit(1);
}
// 如果有第二个参数 表示该组件在modules的子文件夹中
if(process.argv[3]) {
  if(process.argv[3] === componentName) {
    defaultPath = `../src/modules`;
  } else {
    defaultPath = `../src/modules/${process.argv[3]}`;
    testDefaultPath = "../../../../test/unit/specs";
  }
}

const componentPath = path.resolve(__dirname, defaultPath, componentName);
const Files = [
  {
    filename: "index.tsx",
    content: `import Vue from 'vue';
import {} from 'vuex';
import Component from "vue-class-component";
import {} from "element-ui";

@Component({})

export default class ${componentName} extends Vue {

  render(h){

  }

  mounted(){

  }
}
    `
  },
  {
    filename: "style.scss",
    content: `@import '~@/style/utils/mixins.scss';
@import "~@/style/var.scss";
`
  },
  {
    filename: path.join(testDefaultPath, `${componentName}.spec.js`),
    content: `import { createTest, destroyVM } from '../util';
import ${componentName} from '../../${defaultPath}/${componentName}';

describe('${componentName}', () => {
  let vm;
  afterEach(() => {
    destroyVM(vm);
  });

  it('create', () => {
    vm = createTest(${componentName}, true);
    expect(vm.$el).toExist();
  });
});
`
  }
];


// 创建 component
Files.forEach(file => {
  fileSave(path.join(componentPath, file.filename))
    .write(file.content, "utf8")
    .end("\n");
});



console.info("DONE!");
