import {
  REMOVE_FROM_WISHLIST,
  SET_WISHLIST,
  TOGGLE_WISHLIST,
} from './wishlist.actions'

const initialState = {
  items: [],
}

export default function wishlistReducer(state = initialState, action) {
  switch (action.type) {
    case TOGGLE_WISHLIST: {
      const product = action.payload
      const id = product?.id
      if (id == null) return state
      const idx = state.items.findIndex((p) => String(p?.id) === String(id))
      if (idx >= 0) {
        return {
          ...state,
          items: state.items.filter((_, i) => i !== idx),
        }
      }
      return {
        ...state,
        items: [...state.items, product],
      }
    }
    case REMOVE_FROM_WISHLIST: {
      const productId = action.payload
      return {
        ...state,
        items: state.items.filter((p) => String(p?.id) !== String(productId)),
      }
    }
    case SET_WISHLIST:
      return {
        ...state,
        items: Array.isArray(action.payload) ? action.payload : [],
      }
    default:
      return state
  }
}
