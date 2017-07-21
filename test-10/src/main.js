import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { applyMiddleware, compose, createStore } from 'redux'
import {browserHistory, Router ,Route} from 'react-router';
//react-router-redux用于处理redux与react-router协同工作
import { syncHistoryWithStore } from 'react-router-redux'

import Reducer from './reducer'
import routes from './routes'
import Home from './components/home/home'

const store = createStore(Reducer)
const history = syncHistoryWithStore(browserHistory, store)

ReactDOM.render (
      <Provider store={store}>
            <Router history={history} routes={routes} />
      </Provider>,
     document.getElementById('root')
)
