import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';

function App() {

  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [isImagePopupOpen, setImagePopupOpen] = React.useState(false);

  const handleEditAvatarClick = ()=> {
    setEditAvatarPopupOpen(true);
  }

  const handleEditProfileClick = ()=> {
    setEditProfilePopupOpen(true);
  }

  const handleAddPlaceClick = ()=> {
    setAddPlacePopupOpen(true);
  }

  const handleCardClick = (cardData) => {
    setImagePopupOpen(true);
    setSelectedCard(cardData)
  }

  const closeAllPopups = ()=> {
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setEditAvatarPopupOpen(false);
    setImagePopupOpen(false);
  }

  return (
    <div className="page">
      <Header />

      <div className="page__container">

        <Main
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            onCardClick={handleCardClick}
        />

        <Footer />

        <PopupWithForm
          title='Редактировать профиль'
          name='edit-profile'
          buttonTitle='Сохранить'
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          children={
            <>
              <input className="popup__input popup__input_type_name" type="text" defaultValue="Жак-Ив Кусто" placeholder="Имя"
                   name="name" required minLength="2" maxLength="40" autoComplete="off"/>
              <span id='name-error'/>

              <input className="popup__input popup__input_type_occupation" type="text" defaultValue="Исследователь океана"
                   placeholder="О себе" name="job" required minLength="2" maxLength="200" autoComplete="off"/>
              <span id='job-error'/>

            </>
          }
        />

        <PopupWithForm
            title='Новое место'
            name='add-card'
            buttonTitle='Сохранить'
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            children={
              <>
                <input className="popup__input popup__input_type_place" type="text" placeholder="Название" name="place"
                       required minLength="1" maxLength="30" autoComplete="off"/>
                <span id='place-error'/>

                <input className="popup__input popup__input_type_link" type="url" placeholder="Ссылка на картинку"
                       name="link" required autoComplete="off"/>
                <span id='link-error'/>

              </>
            }
        />

        <PopupWithForm
            title='Обновить аватар'
            name='edit-avatar'
            buttonTitle='Сохранить'
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            children={
              <>
                <input className="popup__input popup__input_type_link" type="url" placeholder="Ссылка на аватар"
                       name="avatar" required autoComplete="off"/>
                <span id='avatar-error'/>

              </>
            }
        />

        <PopupWithForm
            title='Вы уверены?'
            name='confirm-delete'
            buttonTitle='Да'
        />

        <ImagePopup card={selectedCard} isOpen={isImagePopupOpen} onClose={closeAllPopups}/>

      </div>

    </div>
  );
}

export default App;
