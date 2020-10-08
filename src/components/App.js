import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';

function App() {
  return (
    <div className="page">
      <Header />

      <div className="page__container">

        <Main />

        <Footer />

        <PopupWithForm
          title='Редактировать профиль'
          name='edit-profile'
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
        />

        <ImagePopup />

      </div>

      <template className="elements__template">
        <div className="element">
          <button className="element__delete defocus"></button>
          <div className="element__image"></div>
          <div className="element__info">
            <h2 className="element__title"></h2>
            <div className="element__like-container">
              <button type="button" className="element__like defocus"></button>
              <p className="element__likes-quantity"></p>
            </div>
          </div>
        </div>
      </template>
    </div>
  );
}

export default App;
