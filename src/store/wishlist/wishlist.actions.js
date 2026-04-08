export const TOGGLE_WISHLIST = 'wishlist/TOGGLE_WISHLIST'
export const REMOVE_FROM_WISHLIST = 'wishlist/REMOVE_FROM_WISHLIST'
export const SET_WISHLIST = 'wishlist/SET_WISHLIST'

export const toggleWishlist = (product) => ({ type: TOGGLE_WISHLIST, payload: product })
export const removeFromWishlist = (productId) => ({
  type: REMOVE_FROM_WISHLIST,
  payload: productId,
})
export const setWishlist = (items) => ({ type: SET_WISHLIST, payload: items })
