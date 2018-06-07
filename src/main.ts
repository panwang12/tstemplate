// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
Vue.config.productionTip = false
import VueI18n from 'vue-i18n'
import zh from './locale/zh'
import en from './locale/en'
import enEle from 'element-ui/lib/locale/lang/en'
import zhEle from 'element-ui/lib/locale/lang/zh-CN'
import locale from 'element-ui/lib/locale'
import Cache from "./utils/cache"
locale.use(enEle)
Vue.use(VueI18n)
const messages = {
  en,
  zh
}
let language = Cache.localGet("language")
if(language==="zh" || language==="ch"){
  
}else{
  Cache.localSet("language","zh")
}
const i18n = new VueI18n({
  locale: "zh",
  messages,
})
/* eslint-disable no-new */
new Vue({
  router,
  store,
  i18n,
  components: { App },
  template: '<App/>'
}).$mount("#app")
