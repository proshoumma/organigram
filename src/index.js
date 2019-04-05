import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import Routes from './routes'
import store from './store'
import './globals/styles/normalize.css'
import './globals/styles/globalStyles.css'

const App = () => (
  <Provider store={store}>
    <Routes />
  </Provider>
)

// render the app component to root div element
ReactDOM.render(
  <App />,
  document.getElementById('root')
)