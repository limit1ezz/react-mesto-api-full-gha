const BASE_URL = 'https://api.practicum-cyrilgalkin.nomoredomains.monster'
const HEADERS = {
  'Content-Type': 'application/json'
}

function handleServerResponse(res) {
  if (res.ok) {
    return res.json()
  }
  return Promise.reject(`Что-то пошло не так: ${res.status}`)
}

export const register = (email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: HEADERS,
    body: JSON.stringify({ email, password })
  }).then((res) => handleServerResponse(res))
}

export const authorize = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: HEADERS,
    body: JSON.stringify({ email, password })
  }).then((res) => handleServerResponse(res))
}

export const checkTokenOnServer = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      ...HEADERS,
      Authorization: `Bearer ${token}`
    }
  }).then((res) => handleServerResponse(res))
}
