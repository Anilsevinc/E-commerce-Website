import { applyMiddleware, createStore } from 'redux'
import { thunk } from 'redux-thunk'
import { createLogger } from 'redux-logger'

import rootReducer from './rootReducer'
import { getStoredToken } from './client/client.auth'

const logger = createLogger({ collapsed: true })

const middlewares = [thunk]

if (import.meta.env.DEV) {
  middlewares.push(logger)
}

// Do not auto-login from token without backend verify.
// We keep token in localStorage only and verify on app load.
getStoredToken()

const store = createStore(rootReducer, applyMiddleware(...middlewares))

export default store

