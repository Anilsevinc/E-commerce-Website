import { api } from '../../lib/api'
import { setRoles, setUser } from './client.actions'
import { setStoredToken, setStoredUser } from './client.auth'

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
    if (rememberMe) {
      setStoredToken(user.token)
      setStoredUser({ name: user.name, email: user.email, role_id: user.role_id })
    } else {
      setStoredToken('')
      setStoredUser(null)
    }
    return user
  }

export const logoutUser = () => async (dispatch) => {
  dispatch(setUser({}))
  setStoredToken('')
  setStoredUser(null)
}

