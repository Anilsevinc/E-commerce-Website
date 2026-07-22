import { api, setApiAuthToken } from '../../lib/api'
import { setAddressList, setCreditCards, setOrders, setRoles, setUser } from './client.actions'
import { getStoredToken, setStoredToken } from './client.auth'

export const fetchRolesIfNeeded = () => async (dispatch, getState) => {
  const { client } = getState()
  if (Array.isArray(client?.roles) && client.roles.length > 0) return

  const res = await api.get('/roles')
  const list = Array.isArray(res.data) ? res.data : res.data?.roles
  dispatch(setRoles(Array.isArray(list) ? list : []))
}

export const loginUser =
  ({ email, password, rememberMe }) =>
  async (dispatch) => {
    const res = await api.post('/login', { email, password })
    const user = {
      name: res.data?.name,
      email: res.data?.email,
      role_id: res.data?.role_id,
      token: res.data?.token,
    }
    dispatch(setUser(user))
    setApiAuthToken(user.token)
    setStoredToken(rememberMe ? user.token : '')
    return user
  }

export const logoutUser = () => async (dispatch) => {
  dispatch(setUser({}))
  setStoredToken('')
  setApiAuthToken('')
}

export const verifyTokenOnLoad = () => async (dispatch) => {
  const token = getStoredToken()
  if (!token) return

  try {
    setApiAuthToken(token)
    const res = await api.get('/verify')
    const user = {
      name: res.data?.name,
      email: res.data?.email,
      role_id: res.data?.role_id,
      token: res.data?.token || token,
    }
    dispatch(setUser(user))
    setApiAuthToken(user.token)
    setStoredToken(user.token)
  } catch {
    setStoredToken('')
    setApiAuthToken('')
  }
}

export const fetchAddressList = () => async (dispatch) => {
  const res = await api.get('/user/address')
  dispatch(setAddressList(Array.isArray(res.data) ? res.data : []))
}

export const createAddress = (values) => async (dispatch) => {
  await api.post('/user/address', values)
  await dispatch(fetchAddressList())
}

export const updateAddress = (values) => async (dispatch) => {
  await api.put('/user/address', values)
  await dispatch(fetchAddressList())
}

export const deleteAddress = (addressId) => async (dispatch) => {
  await api.delete(`/user/address/${encodeURIComponent(String(addressId))}`)
  await dispatch(fetchAddressList())
}

export const fetchCreditCards = () => async (dispatch) => {
  const res = await api.get('/user/card')
  dispatch(setCreditCards(Array.isArray(res.data) ? res.data : []))
}

export const createCard = (values) => async (dispatch) => {
  await api.post('/user/card', values)
  await dispatch(fetchCreditCards())
}

export const updateCard = (values) => async (dispatch) => {
  await api.put('/user/card', values)
  await dispatch(fetchCreditCards())
}

export const deleteCard = (cardId) => async (dispatch) => {
  await api.delete(`/user/card/${encodeURIComponent(String(cardId))}`)
  await dispatch(fetchCreditCards())
}

export const createOrder = (payload) => async () => {
  const res = await api.post('/order', payload)
  return res.data
}

function normalizeOrdersResponse(data) {
  if (Array.isArray(data)) return data
  if (Array.isArray(data?.orders)) return data.orders
  if (Array.isArray(data?.data)) return data.data
  return []
}

export const fetchOrders = () => async (dispatch) => {
  const res = await api.get('/order')
  dispatch(setOrders(normalizeOrdersResponse(res.data)))
}

