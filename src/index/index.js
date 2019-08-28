import Vue from 'vue'
import Hello from './helloWorld.vue'
import formate from '../utils/utils.js'
// import 'babel-polyfill'
console.log(formate)
new Vue({
    render: h => h(Hello)
}).$mount('#root')
