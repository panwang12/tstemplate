// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
Vue.config.productionTip = false
import VueI18n from 'vue-i18n'
import zhLib from './locale/zh'
import enLib from './locale/en'
import en from 'element-ui/lib/locale/lang/en'
import zh from 'element-ui/lib/locale/lang/zh-CN'
import locale from 'element-ui/lib/locale'
import Cache from "./utils/cache"
locale.use(en)
Vue.use(VueI18n)
const messages = {
  en: {
    message:enLib
  },
  zh: {
    message: zhLib
  }
}
let language = Cache.localGet("language")
if(language==="zh" || language==="ch"){
  
}else{
  Cache.localSet("language","en")
}
const i18n = new VueI18n({
  locale: Cache.localGet("language"),
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
