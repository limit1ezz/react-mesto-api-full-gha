import React from 'react'
import Popup from './Popup'

function PopupWithForm({
  title,
  name,
  buttonText,
  children,
  onSubmit,
  isValid,
  isLoading,
  isOpen,
  onClose
}) {
  return (
    <Popup isOpen={isOpen} onClose={onClose}>
      <h2 className='popup__title'>{title}</h2>
      <form
        className={`popup__form form`}
        name={name}
        noValidate
        onSubmit={onSubmit}
      >
        {children}
        <button type='submit' className='form__button' disabled={!isValid}>
          {isLoading ? <div className='spinner'></div> : buttonText}
        </button>
      </form>
    </Popup>
  )
}

export default PopupWithForm
