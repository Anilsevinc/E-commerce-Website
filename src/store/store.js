import { applyMiddleware, createStore } from 'redux'
import { thunk } from 'redux-thunk'
import { createLogger } from 'redux-logger'

import rootReducer from './rootReducer'

const logger = createLogger({ collapsed: true })

const middlewares = [thunk]

if (import.meta.env.DEV) {
  middlewares.push(logger)
}

const store = createStore(rootReducer, applyMiddleware(...middlewares))

export default store

