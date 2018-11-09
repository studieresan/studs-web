import { createStore, applyMiddleware, compose } from 'redux'
import { fromJS } from 'immutable'
import { routerMiddleware } from 'react-router-redux'
import { combineReducers } from 'redux-immutable'
import thunkMiddleware from 'redux-thunk'
import reducers from 'reducers'
import languageProviderReducer from 'containers/LanguageProvider/reducer'
import globalReducer from 'containers/App/reducer'

const devtools = window.devToolsExtension || (() => noop => noop)

export default function configureStore(initialState = {}, history) {
  // Create the store with two middlewares
  // 1. thunkMiddleware: Allows for async dispatch calls
  // 2. routerMiddleware: Syncs the location/URL path to the state
  const middlewares = [thunkMiddleware, routerMiddleware(history)]

  const enhancers = [applyMiddleware(...middlewares), devtools()]

  const store = createStore(
    combineReducers({
      router: routerReducer,
      language: languageProviderReducer,
      global: globalReducer,
      ...reducers,
    }),
    fromJS(initialState),
    compose(...enhancers),
  )

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('./reducers', () => {
      const nextRootReducer = require('./reducers/index')
      store.replaceReducer(nextRootReducer)
    })
  }

  return store
}

const LOCATION_CHANGE = '@@router/LOCATION_CHANGE'

const initialState = fromJS({
  location: null,
})

// required for Immutable.js compatibility
function routerReducer(state = initialState, { type, payload } = {}) {
  if (type === LOCATION_CHANGE) {
    return state.set('location', fromJS(payload))
  }

  return state
}
