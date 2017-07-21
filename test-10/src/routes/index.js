/**
 * 必须引入才可以使用react的相关api
 */
import React from 'react'
import {
  Route,
  IndexRoute
} from 'react-router'

import Home from '../components/home/home'
// import Bless from '../components/bless/bless'
const Bless = (location,cb) => {
    require([],require => {
      /**
       * webpack支持es6，所以要用默认写法 require('../components/bless/bless').default 
       * 必须配合 getComponent 使用才可以使用 cb(null,Bless)
       */

      const Bless = require('../components/bless/bless').default
      cb(null,Bless)
    })
};

// import Exchange from '../components/exchange/exchange'  
const Exchange = (location,cb) => {
    require([],require => {
       /**
       * webpack支持es6，所以要用默认写法 require('../components/bless/bless').default 
       * 必须配合 getComponent 使用才可以使用 cb(null,Bless)
       */
      const Exchange = require('../components/exchange/exchange').default
      cb(null,Exchange)
    })
};

// import Recharge from '../components/recharge/recharge'
const Recharge = (location,cb) => {
    require([],require => {
       /**
       * webpack支持es6，所以要用默认写法 require('../components/bless/bless').default 
       * 必须配合 getComponent 使用才可以使用 cb(null,Bless)
       */
      const Recharge = require('../components/recharge/recharge').default
      cb(null,Recharge)
    })
};

// import SignCard from '../components/signCard/signCard'
const SignCard = (location,cb) => {
    require([],require => {
       /**
       * webpack支持es6，所以要用默认写法 require('../components/bless/bless').default 
       * 必须配合 getComponent 使用才可以使用 cb(null,Bless)
       */
      const SignCard = require('../components/signCard/signCard').default
      cb(null,SignCard)
    })
};
// import User from '../components/user/user'
const User = (location,cb) => {
    require([],require => {
       /**
       * webpack支持es6，所以要用默认写法 require('../components/bless/bless').default 
       * 必须配合 getComponent 使用才可以使用 cb(null,Bless)
       */
      const User = require('../components/user/user').default
      cb(null,User)
    })
};

const routes =
      <Route>
         <Route path = "/" component = {Home} >
            <IndexRoute component={Home}/> 
         </Route>      
        <Route path = "/bless" getComponent = {Bless}/>
        <Route path = "/exchange" getComponent = {Exchange}/>
        <Route path = "/recharge" getComponent = {Recharge}/>
        <Route path = "/signCard" getComponent = {SignCard}/>
        <Route path = "/user" getComponent = {User}/> 
      </Route>

export default routes