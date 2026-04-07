import { combineReducers } from 'redux'

import client from './client/client.reducer'
import product from './product/product.reducer'
import shoppingCart from './shoppingCart/shoppingCart.reducer'

const rootReducer = combineReducers({
  client,
  product,
  shoppingCart,
})

export default rootReducer

