import { createStore, applyMiddleware, compose } from 'redux'
import { persistStore, persistCombineReducers, purgeStoredState } from 'redux-persist'
import storage from 'redux-persist/es/storage'
import promise from 'redux-promise'
import logger from 'redux-logger'

import reducers from '../reducers'
import defaultState from './default-state'
import errorHandler from '../lib/error-handler'
import config from '../config'

const middleware = [promise, logger]

const persistConfig = {
  storage,
  key: 'root',
  blacklist: config.ephemeralState
}

const appReducers = persistCombineReducers(persistConfig, reducers)

const reducer = (oldState, action) => {
  // If the action encountered a thrown error, then let's handle it well
  if (action && action.payload && action.payload instanceof Error) errorHandler(action)

  let state = oldState

  if (action.type === 'PURGE_EVERYTHING') {
    purgeStoredState(persistConfig)
    state = defaultState
  }

  return appReducers(state, action)
}

export const store = createStore(
  reducer,
  defaultState,
  compose(
    applyMiddleware.apply(this, middleware)
  )
)

export const persistor = persistStore(store)
