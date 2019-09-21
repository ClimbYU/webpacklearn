import Vue from 'vue'
import router from './router/index.js'
import './assets/css/index.css'
// import 'babel-polyfill'
new Vue({
  router,
  render() {
    return (
      <router-view></router-view>
    )
  }
}).$mount('#root')

