import Vue from 'vue'
import './assets/style/reset.less';
// import Hello from './helloWorld.vue'
import Select from './index/components/index.vue'
console.log(Select)
new Vue({
    render: h => h(Select)
}).$mount("#root")