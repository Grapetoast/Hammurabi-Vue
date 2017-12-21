import Vue from 'vue'
import Router from 'vue-router'
const Game = () => import('./components/Game')
const Menu = () => import('./components/Menu')
const ScreenArtGames = () => import('./components/ScreenArtGames')
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Menu',
      component: Menu
    },
    {
      path: '/game',
      name: 'Game',
      component: Game
    },
    {
      path: '/screenartgames',
      name: 'ScreenArtGames',
      component: ScreenArtGames
    }
  ]
})
