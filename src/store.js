import { createStore, compose, combineReducers } from 'redux'

import globalReducer from './globals/reducers'

/**
 * feature based reducer splitting
 * for better scalability and isolation
 */
const rootReducer = combineReducers({
  global: globalReducer,
})

// redux dev tool extension
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

// application store
let store = createStore(
  rootReducer,
  composeEnhancers()
)

export default store