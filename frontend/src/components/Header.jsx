import React, { useState } from 'react'
import { Link, Route, Routes } from 'react-router-dom'
import headerLogo from '../images/header-logo.svg'
import closeBurger from '../images/close-burger.svg'
import burger from '../images/burger.svg'

function Header({ isLoggedIn, userEmail, onLogout }) {
  const [show, setshow] = useState(false)

  return (
    <header className='page-header wrapper__page-header'>
      <div className='page-header__navbar'>
        <nav className='page-header__navigation'>
          <Link className='page-header__logo logo' to='/'>
            <img className='logo__image' src={headerLogo} alt='Логотип сайта' />
          </Link>
          <Routes>
            <Route
              path='/'
              element={
                <>
                  <button
                    className='page-header__icon-wrapper'
                    onClick={() => setshow(!show)}
                  >
                    {show ? (
                      <img
                        className='page-header__icon'
                        src={closeBurger}
                        alt='Закрыть мобильное меню'
                      />
                    ) : (
                      <img
                        className='page-header__icon'
                        src={burger}
                        alt='Открыть мобильное меню'
                      />
                    )}
                  </button>
                  <div className='page-header__info'>
                    <p className='page-header__email'>{userEmail}</p>
                    <Link
                      className='page-header__link'
                      to='/sign-in'
                      onClick={onLogout}
                    >
                      Выйти
                    </Link>
                  </div>
                </>
              }
            />
            <Route
              path='/sign-up'
              element={
                <Link className='page-header__link' to='/sign-in'>
                  Войти
                </Link>
              }
            />
            <Route
              path='/sign-in'
              element={
                <Link className='page-header__link' to='/sign-up'>
                  Регистрация
                </Link>
              }
            />
          </Routes>
        </nav>
      </div>

      {show && isLoggedIn && (
        <div className='page-header__mobile-menu'>
          <p className='page-header__email'>{userEmail}</p>
          <Link className='page-header__link' to='/sign-in' onClick={onLogout}>
            Выйти
          </Link>
        </div>
      )}
    </header>
  )
}

export default Header
