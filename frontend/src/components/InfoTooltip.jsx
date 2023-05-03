import React from 'react'
import { useNavigate } from 'react-router-dom'
import cancel from '../images/cancel.svg'
import success from '../images/success.svg'
import Popup from './Popup'

function InfoTooltip({ isSuccess, isOpen, onClose }) {
  const navigate = useNavigate()

  function handleOnClose(e) {
    if (isSuccess) {
      onClose()
      navigate('/sign-in', { replace: true })
    } else {
      onClose()
    }
  }

  return (
    <Popup isOpen={isOpen} onClose={handleOnClose} name='infotooltip'>
      <div className='popup__flex'>
        <img
          className='popup__image'
          src={isSuccess ? success : cancel}
          alt={isSuccess ? 'success' : 'cancel'}
        ></img>
        <h2 className='popup__title popup__title_type_center'>
          {isSuccess
            ? 'Вы успешно зарегистрировались!'
            : 'Что-то пошло не так! Попробуйте ещё раз.'}
        </h2>
      </div>
    </Popup>
  )
}

export default InfoTooltip
