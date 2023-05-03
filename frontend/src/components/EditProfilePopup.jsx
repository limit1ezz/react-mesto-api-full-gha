import React, { useEffect } from 'react'
import { CurrentUserContext } from '../contexts/CurrentUserContext'
import useValidation from '../hooks/useValidation'
import PopupWithForm from './PopupWithForm'

function EditProfilePopup({ isOpen, onClose, onUpdateUser, isLoading }) {
  const { values, handleChange, errors, isValid, setValues, resetForm } =
    useValidation()

  const currentUser = React.useContext(CurrentUserContext)

  useEffect(() => {
    if (currentUser.name) {
      setValues({
        userName: currentUser.name,
        jobDescription: currentUser.about
      })
    }
    if (!isOpen) {
      resetForm()
    }
  }, [currentUser, setValues, resetForm, isOpen])

  function handleSubmit(e) {
    e.preventDefault()
    onUpdateUser({
      name: values.userName,
      about: values.jobDescription
    })
  }

  return (
    <PopupWithForm
      title={'Редактировать профиль'}
      buttonText={'Сохранить'}
      isOpen={isOpen}
      name={'edit-profile'}
      onClose={onClose}
      onSubmit={handleSubmit}
      isValid={isValid}
      isLoading={isLoading}
    >
      <label className='form__label' aria-label='Имя пользователя'>
        <input
          onChange={handleChange}
          value={values.userName || ''}
          type='text'
          className='form__input'
          name='userName'
          autoComplete='off'
          placeholder='Имя'
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
        {errors.userName}
      </span>
      <label className='form__label' aria-label='Описание деятельности'>
        <input
          onChange={handleChange}
          value={values.jobDescription || ''}
          type='text'
          className='form__input'
          name='jobDescription'
          autoComplete='off'
          placeholder='Описание деятельности'
          minLength='2'
          maxLength='200'
          required
        />
      </label>
      <span
        className={`form__error-message ${
          !isValid && 'form__error-message_active'
        }`}
      >
        {errors.jobDescription}
      </span>
    </PopupWithForm>
  )
}

export default EditProfilePopup
