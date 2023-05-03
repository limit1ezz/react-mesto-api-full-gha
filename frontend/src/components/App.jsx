import React, { useEffect, useState } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { CurrentUserContext } from '../contexts/CurrentUserContext'
import { api } from '../utils/api'
import AddPlacePopup from './AddPlacePopup'
import ConfirmationPopup from './ConfirmationPopup'
import EditAvatarPopup from './EditAvatarPopup'
import EditProfilePopup from './EditProfilePopup'
import Footer from './Footer'
import Header from './Header'
import ImagePopup from './ImagePopup'
import Login from './Login'
import Main from './Main'
import ProtectedRoute from './ProtectedRoute'
import Register from './Register'
import * as auth from '../utils/auth-api'

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false)
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false)
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false)
  const [isConfirmationPopupOpen, setIsConfirmationPopupOpen] = useState(false)
  const [isInfoTooltipPopupOpen, setIsInfoTooltipPopupOpen] = useState(false)

  const [selectedCard, setSelectedCard] = useState({})
  const [currentUser, setCurrentUser] = useState({})
  const [cards, setCards] = useState([])
  const [deletedCard, setDeletedCard] = useState({})
  const [isRegistered, setIsRegistered] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userEmail, setUserEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    async function fetchUserInfo() {
      try {
        const userInfo = await api.getUserInfo()
        setCurrentUser(userInfo)
      } catch (error) {
        console.log(error)
      }
    }
    fetchUserInfo()
  }, [userEmail])

  useEffect(() => {
    async function fetchCards() {
      try {
        const initialCards = await api.getInitialCards()
        setCards(initialCards)
      } catch (error) {
        console.log(error)
      }
    }
    fetchCards()
  }, [])

  useEffect(() => {
    checkTokenFromStorage()
  }, [])

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true)
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true)
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true)
  }

  function handleTrashButtonClick(card) {
    setIsConfirmationPopupOpen(true)
    setDeletedCard(card)
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false)
    setIsAddPlacePopupOpen(false)
    setIsEditAvatarPopupOpen(false)
    setIsConfirmationPopupOpen(false)

    setIsInfoTooltipPopupOpen(false)
    setSelectedCard({})
  }

  function handleCardClick(card) {
    setSelectedCard(card)
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((user) => user._id === currentUser._id)

    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((data) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? data.card : c))
        )
      })
      .catch((err) => {
        console.log(err)
      })
  }

  function handleCardDelete(card) {
    setIsLoading(true)
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id))
        closeAllPopups()
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => setIsLoading(false))
  }

  function handleUpdateUser(info) {
    setIsLoading(true)
    api
      .updateUserInfo(info)
      .then(({ user }) => {
        setCurrentUser(user)
        closeAllPopups()
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => setIsLoading(false))
  }

  function handleUpdateAvatar(avatar) {
    setIsLoading(true)
    api
      .updateAvatar(avatar)
      .then(({ user }) => {
        setCurrentUser(user)
        closeAllPopups()
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => setIsLoading(false))
  }

  function handleAddPlace(placeInfo) {
    setIsLoading(true)
    api
      .addNewCard(placeInfo)
      .then(({ card }) => {
        setCards([card, ...cards])
        closeAllPopups()
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => setIsLoading(false))
  }

  async function handleRegister(email, password) {
    try {
      setIsLoading(true)
      await auth.register(email, password)
      setIsRegistered(true)
    } catch (err) {
      console.log(err)
    } finally {
      setIsLoading(false)
      setIsInfoTooltipPopupOpen(true)
    }
  }

  async function handleLogin(email, password) {
    try {
      setIsLoading(true)
      const { accessToken } = await auth.authorize(email, password)
      const data = await auth.checkTokenOnServer(accessToken)
      setUserEmail(data.email)
      setIsLoggedIn(true)
      localStorage.setItem('token', accessToken)
    } catch (err) {
      console.log(err)
      setIsInfoTooltipPopupOpen(true)
    } finally {
      setIsLoading(false)
    }
  }

  async function checkTokenFromStorage() {
    const token = localStorage.getItem('token')
    if (token) {
      try {
        const data = await auth.checkTokenOnServer(token)
        setUserEmail(data.email)
        setIsLoggedIn(true)
      } catch (err) {
        console.log(err)
      }
    }
  }

  function handleLogout() {
    localStorage.removeItem('token')
    setUserEmail('')
    setIsLoggedIn(false)
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className='wrapper'>
        <Header
          isLoggedIn={isLoggedIn}
          userEmail={userEmail}
          onLogout={handleLogout}
        />

        <Routes>
          <Route
            path='/'
            element={
              <ProtectedRoute
                element={Main}
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onEditAvatar={handleEditAvatarClick}
                onCardClick={handleCardClick}
                onCardLike={handleCardLike}
                onTrashClick={handleTrashButtonClick}
                cards={cards}
                isLoggedIn={isLoggedIn}
              />
            }
          />
          <Route
            path='/sign-up'
            element={
              <Register
                isOpen={isInfoTooltipPopupOpen}
                onClose={closeAllPopups}
                isRegistered={isRegistered}
                onRegister={handleRegister}
                isLoading={isLoading}
              />
            }
          />
          <Route
            path='/sign-in'
            element={
              <Login
                onLogin={handleLogin}
                isLoggedIn={isLoggedIn}
                isOpen={isInfoTooltipPopupOpen}
                onClose={closeAllPopups}
                isLoading={isLoading}
              />
            }
          />
          <Route path='*' element={<Navigate to='/' replace />} />
        </Routes>

        <Footer />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          isLoading={isLoading}
        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          isLoading={isLoading}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlace}
          isLoading={isLoading}
        />

        <ConfirmationPopup
          isOpen={isConfirmationPopupOpen}
          onClose={closeAllPopups}
          onCardDelete={handleCardDelete}
          deletedCard={deletedCard}
          isLoading={isLoading}
        />

        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
      </div>
    </CurrentUserContext.Provider>
  )
}

export default App
