import Vue from 'vue'
import Search from './search.vue'
import { formate } from '../utils/utils.js';

new Vue({
    render: h => h(Search)
}).$mount('#search')
