import React from 'react'
import PopupWithForm from './PopupWithForm'

function ConfirmationPopup({
  onCardDelete,
  isOpen,
  onClose,
  deletedCard,
  isLoading
}) {
  function handleSubmit(e) {
    e.preventDefault()
    onCardDelete(deletedCard)
  }
  return (
    <PopupWithForm
      title={'Вы уверены?'}
      buttonText={'Да'}
      isOpen={isOpen}
      name={'delete-confirmation'}
      onClose={onClose}
      onSubmit={handleSubmit}
      isValid={true}
      isLoading={isLoading}
    ></PopupWithForm>
  )
}

export default ConfirmationPopup
