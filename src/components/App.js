import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import {api} from '../utils/api.js';
import {CurrentUserContext} from '../contexts/CurrentUserContext';
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";


function App() {


  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [isImagePopupOpen, setImagePopupOpen] = React.useState(false);

  const [currentUser, setCurrentUser] = React.useState('');

  React.useEffect(() => {
    const userInfo = api.getUserInfo();

    userInfo
        .then((userData) => {
      setCurrentUser(userData);
    })
        .catch((err) => {
          console.log(err + ' , нам очень жаль');
        });
  }, []);

  const handleEditAvatarClick = ()=> {
    setEditAvatarPopupOpen(true);
  };

  const handleEditProfileClick = ()=> {
    setEditProfilePopupOpen(true);
  };

  const handleAddPlaceClick = ()=> {
    setAddPlacePopupOpen(true);
  };

  const handleCardClick = (cardData) => {
    setImagePopupOpen(true);
    setSelectedCard(cardData)
  };

  const closeAllPopups = ()=> {
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setEditAvatarPopupOpen(false);
    setImagePopupOpen(false);
  };
  
  function handleUpdateUser(newDataUser) {
    api.setEditedUserInfo(newDataUser)
        .then((newUserData) => {
          setCurrentUser(newUserData);
          closeAllPopups();
        })
        .catch((err) => {
          console.log(err + ' , нам очень жаль');
        });
  }
  
  function handleUpdateAvatar(newDataAvatar) {
    api.changeAvatar(newDataAvatar)
        .then((newAvatarData) => {
          setCurrentUser(newAvatarData);
          closeAllPopups();
        })
        .catch((err) => {
          console.log(err + ' , нам очень жаль');
        });
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>

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

        <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser}/>

        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar}/>

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
            title='Вы уверены?'
            name='confirm-delete'
            buttonTitle='Да'
        />

        <ImagePopup card={selectedCard} isOpen={isImagePopupOpen} onClose={closeAllPopups}/>

      </div>

    </div>

    </CurrentUserContext.Provider>
  );
}

export default App;
