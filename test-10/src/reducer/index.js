import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import customerInfo from './customerInfo'

console.log(customerInfo)
export default combineReducers({
    customerInfo,
    //必须加上routing才能渲染成功
    routing: routerReducer
})