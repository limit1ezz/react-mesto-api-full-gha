import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import useValidation from '../hooks/useValidation'
import InfoTooltip from './InfoTooltip'

function Register({ isOpen, onClose, isRegistered, onRegister, isLoading }) {
  const { values, handleChange, errors, isValid, resetForm } = useValidation()

  useEffect(() => {
    resetForm()
  }, [resetForm])

  const handleSubmit = (e) => {
    e.preventDefault()
    onRegister(values.userEmail, values.userPassword)
  }

  return (
    <div className='auth'>
      <h2 className='auth__title'>Регистрация</h2>
      <form
        className={`auth__form form`}
        onSubmit={handleSubmit}
        name={'auth-register'}
        noValidate
      >
        <label className='form__label' aria-label='Емейл для регистрации'>
          <input
            onChange={handleChange}
            value={values.userEmail || ''}
            type='email'
            className='form__input form__input_type_inverted'
            name='userEmail'
            autoComplete='off'
            placeholder='Email'
            minLength='2'
            maxLength='40'
            required
          />
        </label>
        <span
          className={`form__error-message ${
            !isValid && 'form__error-message_active'
          }`}
        >
          {errors.userEmail}
        </span>
        <label className='form__label' aria-label='Пароль для регистрации'>
          <input
            onChange={handleChange}
            value={values.userPassword || ''}
            type='password'
            className='form__input form__input_type_inverted'
            name='userPassword'
            autoComplete='off'
            placeholder='Пароль'
            minLength='6'
            maxLength='40'
            required
          />
        </label>
        <span
          className={`form__error-message ${
            !isValid && 'form__error-message_active'
          }`}
        >
          {errors.userPassword}
        </span>

        <button
          type='submit'
          className='form__button form__button_type_inverted'
          disabled={!isValid}
        >
          {isLoading ? (
            <div className='spinner spinner_type_dark'></div>
          ) : (
            ' Зарегистрироваться'
          )}
        </button>

        <p className='auth__bottom'>
          Уже зарегистрированы?{' '}
          <Link className='auth__link' to='/sign-in'>
            Войти
          </Link>
        </p>
      </form>
      <InfoTooltip isOpen={isOpen} onClose={onClose} isSuccess={isRegistered} />
    </div>
  )
}

export default Register
