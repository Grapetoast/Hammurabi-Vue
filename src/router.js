import Vue from 'vue'
import Router from 'vue-router'
const HammurabiGame = () => import('./components/HammurabiGame')
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HammurabiGame',
      component: HammurabiGame
    }
  ]
})
