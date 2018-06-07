# project1

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

## 生成组件文件
```bash
// 在components文件夹内生成一个ComponentName文件夹 包含index.tsx和style.scss
npm run new ComponentName 

// 在modules的子文件夹ModuleFile内生成一个ComponentName文件夹 包含index.tsx和style.scss 
npm run new ComponentName ModuleFile

// 在modules的子文件夹ModuleFile内生成index.tsx和style.scss 
npm run new ModuleFile ModuleFile

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
