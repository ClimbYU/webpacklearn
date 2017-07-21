/**
 * 必须引入才可以使用react的相关api
 */
import React from 'react'
import {
  Route,
  IndexRoute
} from 'react-router'

import Home from '../components/home/home'
import Bless from '../components/bless/bless'
import Exchange from '../components/exchange/exchange'
import Recharge from '../components/recharge/recharge'
import SignCard from '../components/signCard/signCard'
import User from '../components/user/user'

const routes =
      <Route>
         <Route path = "/" component = {Home} >
            <IndexRoute component={Home}/> 
         </Route>      
        <Route path = "/bless" component = {Bless}/>
        <Route path = "/exchange" component = {Exchange}/>
        <Route path = "/recharge" component = {Recharge}/>
        <Route path = "/signCard" component = {SignCard}/>
        <Route path = "/user" component = {User}/> 
      </Route>

export default routes