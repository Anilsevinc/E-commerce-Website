import { applyMiddleware, createStore } from 'redux'
import { thunk } from 'redux-thunk'
import { createLogger } from 'redux-logger'

import rootReducer from './rootReducer'
import { getStoredToken } from './client/client.auth'
import {
  loadShoppingCartState,
  saveShoppingCartState,
} from './shoppingCart/shoppingCart.storage'
import { loadWishlistState, saveWishlistState } from './wishlist/wishlist.storage'

const logger = createLogger({ collapsed: true })

const middlewares = [thunk]

if (import.meta.env.DEV) {
  middlewares.push(logger)
}

// Do not auto-login from token without backend verify.
// We keep token in localStorage only and verify on app load.
getStoredToken()

const persistedWishlist = loadWishlistState()
const persistedShoppingCart = loadShoppingCartState()
const preloadedState =
  persistedWishlist !== undefined || persistedShoppingCart !== undefined
    ? {
        ...(persistedWishlist !== undefined ? { wishlist: persistedWishlist } : {}),
        ...(persistedShoppingCart !== undefined ? { shoppingCart: persistedShoppingCart } : {}),
      }
    : undefined

const store = createStore(
  rootReducer,
  preloadedState,
  applyMiddleware(...middlewares)
)

store.subscribe(() => {
  saveWishlistState(store.getState().wishlist)
  saveShoppingCartState(store.getState().shoppingCart)
})

export default store

