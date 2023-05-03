import React from 'react'
import Popup from './Popup'

function ImagePopup({ card, onClose }) {
  return (
    <Popup
      isOpen={!!card.link}
      onClose={onClose}
      popupType='image'
      containerType='image'
    >
      <figure className='image-card'>
        <img className='image-card__photo' src={card.link} alt={card.name} />
        <figcaption className='image-card__caption'>{card.name}</figcaption>
      </figure>
    </Popup>
  )
}

export default ImagePopup
