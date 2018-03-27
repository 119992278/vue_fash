import Cookies from 'js-cookie'

const TokenKey = 'token'

export function getToken(name) {
    return Cookies.get(name)
}

export function setToken(key, token) {
    return Cookies.set(key, token)
}

export function removeToken(token) {
    return Cookies.remove(token)
}