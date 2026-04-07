import {
  SET_ADDRESS_LIST,
  SET_CREDIT_CARDS,
  SET_LANGUAGE,
  SET_ORDERS,
  SET_ROLES,
  SET_THEME,
  SET_USER,
} from './client.actions'

const initialState = {
  user: {},
  addressList: [],
  creditCards: [],
  orders: [],
  roles: [],
  theme: 'light',
  language: 'en',
}

export default function clientReducer(state = initialState, action) {
  switch (action.type) {
    case SET_USER:
      return { ...state, user: action.payload }
    case SET_ADDRESS_LIST:
      return { ...state, addressList: action.payload }
    case SET_CREDIT_CARDS:
      return { ...state, creditCards: action.payload }
    case SET_ORDERS:
      return { ...state, orders: action.payload }
    case SET_ROLES:
      return { ...state, roles: action.payload }
    case SET_THEME:
      return { ...state, theme: action.payload }
    case SET_LANGUAGE:
      return { ...state, language: action.payload }
    default:
      return state
  }
}

