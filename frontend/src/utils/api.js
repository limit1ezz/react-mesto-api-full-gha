class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl
    this._headers = headers
  }

  handleServerResponse(res) {
    if (res.ok) {
      return res.json()
    }
    return Promise.reject(`Что-то пошло не так: ${res.status}`)
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, { headers: this._headers }).then(
      (res) => this.handleServerResponse(res)
    )
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, { headers: this._headers }).then(
      (res) => this.handleServerResponse(res)
    )
  }

  updateUserInfo(info) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify(info)
    }).then((res) => this.handleServerResponse(res))
  }

  addNewCard(cardInfo) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify(cardInfo)
    }).then((res) => this.handleServerResponse(res))
  }

  deleteCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers
    }).then((res) => this.handleServerResponse(res))
  }

  addLike(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: this._headers
    }).then((res) => this.handleServerResponse(res))
  }

  deleteLike(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: this._headers
    }).then((res) => this.handleServerResponse(res))
  }

  changeLikeCardStatus(cardId, status) {
    return status ? this.addLike(cardId) : this.deleteLike(cardId)
  }

  updateAvatar(avatar) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify(avatar)
    }).then((res) => this.handleServerResponse(res))
  }
}

export const api = new Api({
  baseUrl: 'http://localhost:3000',
  headers: {
    authorization: `Bearer ${localStorage.getItem('token')}`,
    'Content-Type': 'application/json'
  }
})
