import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
// import page1 from'@/components/page1.vue'
// import page2 from'@/components/page2.vue'


export default new Router({
  routes: [
    {
      path: '/',
      name: 'page1',
      component: ()=> import('@/components/page1.vue')
    },
    {
      path: '/page2',
      name: 'page2',
      component: ()=> import('@/components/page2.vue')
    }
  ]
})
