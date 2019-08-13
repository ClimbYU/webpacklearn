import Vue from 'vue'
import Hello from './helloWorld.vue'
// import 'babel-polyfill'

new Vue({
  render: h => h(Hello)
}).$mount('#root')
