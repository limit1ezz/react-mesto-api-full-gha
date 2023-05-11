import React, { useContext } from 'react'
import { CurrentUserContext } from '../contexts/CurrentUserContext'
import Card from './Card'

function Main({
  onEditProfile,
  onAddPlace,
  onEditAvatar,
  onCardClick,
  onCardLike,
  onTrashClick,
  cards
}) {
  const currentUser = useContext(CurrentUserContext)

  return (
    <main className='page-content wrapper__page-content'>
      <section className='profile' aria-label='Информация о пользователе'>
        <div className='profile__inner'>
          <div className='profile__image-box'>
            <img
              className='profile__image'
              src={currentUser?.avatar}
              alt='Аватар пользователя'
            />
            <button
              type='button'
              className='profile__overlay'
              aria-label='Изменить фото профиля'
              onClick={onEditAvatar}
            />
          </div>
          <div className='profile__info'>
            <div className='profile__content'>
              <h1 className='profile__name'>{currentUser?.name}</h1>
              <p className='profile__description'>{currentUser?.about}</p>
            </div>
            <button
              type='button'
              className='profile__edit'
              aria-label='Изменить профиль'
              onClick={onEditProfile}
            />
          </div>
          <button
            type='button'
            className='profile__add-photo-card'
            aria-label='Добавить карточку с
              изображением'
            onClick={onAddPlace}
          />
        </div>
      </section>

      <section
        className='photos'
        aria-label='Коллекция фотографий пользователя'
      >
        <ul className='photos__inner'>
          {cards &&
            cards.map(card => (
              <li className='photos__item' key={card._id}>
                <Card
                  card={card}
                  onCardClick={onCardClick}
                  onCardLike={onCardLike}
                  onTrashClick={onTrashClick}
                />
              </li>
            ))}
        </ul>
      </section>
    </main>
  )
}

export default Main
