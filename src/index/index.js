import Vue from 'vue'
import router from './router/index.js'
// import 'babel-polyfill'
new Vue({
  router,
  render() {
    return (
      <router-view></router-view>
    )
  }
}).$mount('#root')

