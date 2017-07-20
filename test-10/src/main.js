import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { applyMiddleware, compose, createStore } from 'redux'
import {browserHistory, Router } from 'react-router';

import Reducer from './reducer'
import routes from './routes'

const store = createStore(Reducer)

ReactDOM.render (
      <Provider store={store}>
       <div>
            <Router history={browserHistory}>
                  {routes}
            </Router>
       </div>
      </Provider>,
     document.getElementById('root')
)
