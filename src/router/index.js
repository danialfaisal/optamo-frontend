import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import HelloWorld from '@/components/HelloWorld'
import Auth from '@/components/Auth'
// import WeatherList from '@/components/WeatherList'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
      {
      path: '/auth',
      name: 'Auth',
      component: Auth
    }
  ]
})
