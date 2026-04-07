import {
  ADD_TO_CART,
  DEC_CART_ITEM,
  INC_CART_ITEM,
  REMOVE_FROM_CART,
  SET_ADDRESS,
  SET_CART,
  SET_PAYMENT,
  TOGGLE_CART_ITEM,
} from './shoppingCart.actions'

const initialState = {
  cart: [],
  payment: {},
  address: {},
}

export default function shoppingCartReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_TO_CART: {
      const product = action.payload
      const productId = product?.id
      if (!productId) return state

      const idx = state.cart.findIndex((ci) => String(ci?.product?.id) === String(productId))
      if (idx === -1) {
        return {
          ...state,
          cart: [...state.cart, { count: 1, checked: true, product }],
        }
      }

      return {
        ...state,
        cart: state.cart.map((ci, i) =>
          i === idx ? { ...ci, count: Number(ci.count || 0) + 1 } : ci
        ),
      }
    }
    case REMOVE_FROM_CART: {
      const productId = action.payload
      return {
        ...state,
        cart: state.cart.filter((ci) => String(ci?.product?.id) !== String(productId)),
      }
    }
    case INC_CART_ITEM: {
      const productId = action.payload
      return {
        ...state,
        cart: state.cart.map((ci) =>
          String(ci?.product?.id) === String(productId)
            ? { ...ci, count: Number(ci.count || 0) + 1 }
            : ci
        ),
      }
    }
    case DEC_CART_ITEM: {
      const productId = action.payload
      return {
        ...state,
        cart: state.cart.map((ci) =>
          String(ci?.product?.id) === String(productId)
            ? { ...ci, count: Math.max(1, Number(ci.count || 0) - 1) }
            : ci
        ),
      }
    }
    case TOGGLE_CART_ITEM: {
      const productId = action.payload
      return {
        ...state,
        cart: state.cart.map((ci) =>
          String(ci?.product?.id) === String(productId)
            ? { ...ci, checked: !ci.checked }
            : ci
        ),
      }
    }
    case SET_CART:
      return { ...state, cart: action.payload }
    case SET_PAYMENT:
      return { ...state, payment: action.payload }
    case SET_ADDRESS:
      return { ...state, address: action.payload }
    default:
      return state
  }
}

