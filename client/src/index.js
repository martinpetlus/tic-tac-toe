import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'

import io from 'socket.io-client';

import App from './App';
import registerServiceWorker from './registerServiceWorker'
import configureStore from './store/configureStore'

const socket = io('http://localhost:3001')

const store = configureStore(socket)

socket.on('actions', action => store.dispatch(action))

render(
  <Provider {...{ store }}>
    <App />
  </Provider>,
  document.getElementById('root')
)

registerServiceWorker()
