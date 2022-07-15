/* eslint-disable */
/* 
本地存储 
1.存token
2.存时间【记录token是否过期】
*/

const TokenKey = 'ADMIN-TOKEN'
//token
export function getToken() {
  return window.localStorage.getItem(TokenKey)
}

export function setToken(token) {
  return window.localStorage.setItem(TokenKey, token)
}

export function removeToken() {
  return window.localStorage.removeItem(TokenKey)
}
