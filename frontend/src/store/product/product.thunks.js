import { api } from '../../lib/api'
import {
  setCategories,
  setFetchState,
  setProductList,
  setSelectedProduct,
  setSelectedProductFetchState,
  setTotal,
} from './product.actions'

export const fetchCategoriesIfNeeded = () => async (dispatch, getState) => {
  const { product } = getState()
  if (Array.isArray(product?.categories) && product.categories.length > 0) return

  const res = await api.get('/categories')
  dispatch(setCategories(Array.isArray(res.data) ? res.data : []))
}

export const fetchProducts =
  ({ limit, offset, categoryId, sort, filter } = {}) =>
  async (dispatch, getState) => {
    const state = getState()
    const effectiveLimit =
      Number.isFinite(Number(limit)) && Number(limit) > 0
        ? Number(limit)
        : Number(state.product?.limit) || 25
    const effectiveOffset =
      Number.isFinite(Number(offset)) && Number(offset) >= 0
        ? Number(offset)
        : Number(state.product?.offset) || 0

    dispatch(setFetchState('FETCHING'))
    try {
      const params = { limit: effectiveLimit, offset: effectiveOffset }
      if (categoryId) params.category = categoryId
      if (sort) params.sort = sort
      if (filter) params.filter = filter

      const res = await api.get('/products', { params })
      dispatch(setTotal(Number(res.data?.total) || 0))
      dispatch(setProductList(Array.isArray(res.data?.products) ? res.data.products : []))
      dispatch(setFetchState('FETCHED'))
    } catch {
      dispatch(setFetchState('FAILED'))
    }
  }

export const fetchProductById = (productId) => async (dispatch) => {
  if (!productId) return
  dispatch(setSelectedProductFetchState('FETCHING'))
  try {
    const res = await api.get(`/products/${encodeURIComponent(String(productId))}`)
    dispatch(setSelectedProduct(res.data || null))
    dispatch(setSelectedProductFetchState('FETCHED'))
  } catch {
    dispatch(setSelectedProduct(null))
    dispatch(setSelectedProductFetchState('FAILED'))
  }
}

