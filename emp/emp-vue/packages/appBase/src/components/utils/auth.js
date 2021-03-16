import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'
const Token4AKey = 'X-Auth-Token'
const JSESSIONID = 'JSESSIONID'



export function getToken() {
  return Cookies.get(TokenKey)
}

export function get4AToken() {
  return Cookies.get(Token4AKey)
}

export function getJSESSIONID() {
  return Cookies.get(JSESSIONID)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
