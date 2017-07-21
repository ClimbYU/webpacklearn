/**
 * 必须引入才可以使用react的相关api
 */
import React from 'react'
import {
  Route,
  IndexRoute
} from 'react-router'

import Home from '../components/home/home'
const routes =
         <Route path='/' component={Home} >
          <IndexRoute component={Home}/>
          <Route/>
          <Route/>
      </Route>

export default routes