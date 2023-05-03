import React, { useEffect } from 'react'
import useValidation from '../hooks/useValidation'
import PopupWithForm from './PopupWithForm'

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar, isLoading }) {
  const { values, handleChange, errors, isValid, resetForm } = useValidation()

  useEffect(() => {
    if (isOpen) {
      resetForm()
    }
  }, [isOpen, resetForm])

  function handleSubmit(e) {
    e.preventDefault()
    onUpdateAvatar({
      avatar: values.avatarLink
    })
  }

  return (
    <PopupWithForm
      title={'Обновить аватар'}
      buttonText={'Сохранить'}
      isOpen={isOpen}
      name={'update-avatar'}
      onClose={onClose}
      onSubmit={handleSubmit}
      isValid={isValid}
      isLoading={isLoading}
    >
      <label className='form__label' aria-label='Ссылка на картинку'>
        <input
          onChange={handleChange}
          value={values.avatarLink || ''}
          type='url'
          className='form__input'
          name='avatarLink'
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
        {errors.avatarLink}
      </span>
    </PopupWithForm>
  )
}

export default EditAvatarPopup
