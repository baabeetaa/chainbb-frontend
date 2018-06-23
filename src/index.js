import 'core-js/fn/map'

import React from 'react'
import { render } from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk';
import App from './containers/app'
import reducer from './reducers'

// import '../semantic/dist/semantic.min.css';
import '../semantic/dist/semantic.cyborg.min.css';
import './index.css'

const target = document.getElementById('root')
const store = createStore(reducer, applyMiddleware(thunk))

const node = (
  <Provider store={store}>
    <App />
  </Provider>
)

render(node, target)
