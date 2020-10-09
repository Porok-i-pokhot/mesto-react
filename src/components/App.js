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

  const handleEditAvatarClick = ()=> {
    setEditAvatarPopupOpen(true);
    // document.querySelector('.popup_edit-avatar').classList.add('popup_opened');
  }

  const handleEditProfileClick = ()=> {
    // document.querySelector('.popup_edit-profile').classList.add('popup_opened');
    setEditProfilePopupOpen(true);
  }

  const handleAddPlaceClick = ()=> {
    setAddPlacePopupOpen(true);
    // document.querySelector('.popup_add-card').classList.add('popup_opened');
  }

  const closeAllPopups = ()=> {
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setEditAvatarPopupOpen(false);
  }

  return (
    <div className="page">
      <Header />

      <div className="page__container">

        <Main
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
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
              <input className="popup__input popup__input_type_name" type="text" value="Жак-Ив Кусто" placeholder="Имя"
                   name="name" required minLength="2" maxLength="40" autoComplete="off"/>
              <span id='name-error'/>

              <input className="popup__input popup__input_type_occupation" type="text" value="Исследователь океана"
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

        <ImagePopup />

      </div>

    </div>
  );
}

export default App;
