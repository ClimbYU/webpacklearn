import Vue from 'vue'
import Hello from './helloWorld.vue'

new Vue({
    render: h => h(Hello)
}).$mount('#root')
