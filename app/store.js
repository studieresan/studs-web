/**
 * Create the store with asynchronously loaded reducers
 */

import { createStore, applyMiddleware, compose } from 'redux'
import { fromJS } from 'immutable'
import { routerMiddleware } from 'react-router-redux'
import thunkMiddleware from 'redux-thunk'
import createReducer from './reducers'

const devtools = window.devToolsExtension || (() => (noop) => noop)

export default function configureStore(initialState = {}, history) {
  // Create the store with two middlewares
  // 1. thunkMiddleware: Allows for async dispatch calls 
  // 2. routerMiddleware: Syncs the location/URL path to the state
  const middlewares = [
    thunkMiddleware,
    routerMiddleware(history),
  ]

  const enhancers = [
    applyMiddleware(...middlewares),
    devtools(),
  ]

  const store = createStore(
    createReducer(),
    fromJS(initialState),
    compose(...enhancers)
  )

  // Make reducers hot reloadable, see http://mxs.is/googmo
  /* istanbul ignore next */
  if (module.hot) {
    System.import('./reducers').then((reducerModule) => {
      const createReducers = reducerModule.default
      const nextReducers = createReducers(store.asyncReducers)

      store.replaceReducer(nextReducers)
    })
  }

  // Initialize it with no other reducers
  store.asyncReducers = {}
  return store
}
