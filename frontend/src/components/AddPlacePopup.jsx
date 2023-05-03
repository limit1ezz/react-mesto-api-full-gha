import React, { useEffect } from 'react'
import useValidation from '../hooks/useValidation'
import PopupWithForm from './PopupWithForm'

function AddPlacePopup({ isOpen, onClose, onAddPlace, isLoading }) {
  const { values, handleChange, errors, isValid, resetForm } = useValidation()

  useEffect(() => {
    if (isOpen) {
      resetForm()
    }
  }, [isOpen, resetForm])

  function handleSubmit(e) {
    e.preventDefault()
    onAddPlace({
      name: values.placeName,
      link: values.imageLink
    })
  }

  return (
    <PopupWithForm
      title={'Новое место'}
      buttonText={'Создать'}
      isOpen={isOpen}
      name='add-photo-card'
      onClose={onClose}
      onSubmit={handleSubmit}
      isValid={isValid}
      isLoading={isLoading}
    >
      <label className='form__label' aria-label='Название места'>
        <input
          onChange={handleChange}
          value={values.placeName || ''}
          type='text'
          className='form__input'
          name='placeName'
          autoComplete='off'
          placeholder='Название'
          minLength='2'
          maxLength='30'
          required
        />
      </label>
      <span
        className={`form__error-message ${
          !isValid && 'form__error-message_active'
        }`}
      >
        {errors.placeName}
      </span>
      <label className='form__label' aria-label='Ссылка на картинку'>
        <input
          onChange={handleChange}
          value={values.imageLink || ''}
          type='url'
          className='form__input'
          name='imageLink'
          autoComplete='off'
          placeholder='Ссылка на картинку'
          required
        />
      </label>
      <span
        className={`form__error-message ${
          !isValid && 'form__error-message_active'
        }`}
      >
        {errors.imageLink}
      </span>
    </PopupWithForm>
  )
}

export default AddPlacePopup
