import React, { useEffect } from 'react'

function Popup({
  popupType = '',
  containerType = '',
  children,
  isOpen,
  onClose
}) {
  useEffect(() => {
    if (!isOpen) return

    function handleEscClose(e) {
      if (e.key === 'Escape') {
        onClose()
      }
    }
    document.addEventListener('keydown', handleEscClose)

    return () => document.removeEventListener('keydown', handleEscClose)
  }, [isOpen, onClose])

  function handleOverlay(e) {
    if (e.target.classList.contains('popup_opened')) {
      onClose()
    }
  }

  const popupClass = popupType ? `popup popup_type_${popupType}` : 'popup'
  const popupContainer = containerType
    ? `popup__container popup__container_type_${containerType}`
    : 'popup__container'

  return (
    <div
      className={`${popupClass} ${isOpen ? 'popup_opened' : ''}`}
      onClick={handleOverlay}
    >
      <div className={popupContainer}>
        <button
          type='button'
          className='popup__close-btn'
          aria-label='Закрыть окно'
          onClick={onClose}
        />
        {children}
      </div>
    </div>
  )
}

export default Popup
