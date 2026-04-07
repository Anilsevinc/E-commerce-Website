import { api } from '../../lib/api'
import { setRoles } from './client.actions'

export const fetchRolesIfNeeded = () => async (dispatch, getState) => {
  const { client } = getState()
  if (Array.isArray(client?.roles) && client.roles.length > 0) return

  const res = await api.get('/roles')
  const list = Array.isArray(res.data) ? res.data : res.data?.roles
  dispatch(setRoles(Array.isArray(list) ? list : []))
}

