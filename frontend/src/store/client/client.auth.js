export const AUTH_TOKEN_KEY = 'auth_token'

export function setStoredToken(token) {
  if (!token) {
    localStorage.removeItem(AUTH_TOKEN_KEY)
    return
  }
  localStorage.setItem(AUTH_TOKEN_KEY, token)
}

export function getStoredToken() {
  return localStorage.getItem(AUTH_TOKEN_KEY) || ''
}

