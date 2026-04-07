import { applyMiddleware, createStore } from 'redux'
import { thunk } from 'redux-thunk'
import { createLogger } from 'redux-logger'

import rootReducer from './rootReducer'
import { getStoredToken, getStoredUser } from './client/client.auth'

const logger = createLogger({ collapsed: true })

const middlewares = [thunk]

if (import.meta.env.DEV) {
  middlewares.push(logger)
}

const token = getStoredToken()
const storedUser = getStoredUser()

const preloadedState =
  token || storedUser
    ? {
        client: {
          user: { ...(storedUser || {}), ...(token ? { token } : {}) },
          addressList: [],
          creditCards: [],
          roles: [],
          theme: 'light',
          language: 'en',
        },
      }
    : undefined

const store = createStore(rootReducer, preloadedState, applyMiddleware(...middlewares))

export default store

