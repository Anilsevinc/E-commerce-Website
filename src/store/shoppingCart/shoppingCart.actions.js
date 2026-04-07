export const SET_CART = 'shoppingCart/SET_CART'
export const SET_PAYMENT = 'shoppingCart/SET_PAYMENT'
export const SET_ADDRESS = 'shoppingCart/SET_ADDRESS'
export const ADD_TO_CART = 'shoppingCart/ADD_TO_CART'
export const REMOVE_FROM_CART = 'shoppingCart/REMOVE_FROM_CART'
export const INC_CART_ITEM = 'shoppingCart/INC_CART_ITEM'
export const DEC_CART_ITEM = 'shoppingCart/DEC_CART_ITEM'
export const TOGGLE_CART_ITEM = 'shoppingCart/TOGGLE_CART_ITEM'

export const setCart = (cart) => ({ type: SET_CART, payload: cart })
export const setPayment = (payment) => ({ type: SET_PAYMENT, payload: payment })
export const setAddress = (address) => ({ type: SET_ADDRESS, payload: address })
export const addToCart = (product) => ({ type: ADD_TO_CART, payload: product })
export const removeFromCart = (productId) => ({
  type: REMOVE_FROM_CART,
  payload: productId,
})
export const incCartItem = (productId) => ({ type: INC_CART_ITEM, payload: productId })
export const decCartItem = (productId) => ({ type: DEC_CART_ITEM, payload: productId })
export const toggleCartItem = (productId) => ({
  type: TOGGLE_CART_ITEM,
  payload: productId,
})

