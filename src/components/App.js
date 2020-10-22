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
import AddPlacePopup from "./AddPlacePopup";


function App() {

  const [cards, setCards] = React.useState([]);

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
  
  function handleUpdateUser(newDataOfUser) {
    api.setEditedUserInfo(newDataOfUser)
        .then((newUserData) => {
          setCurrentUser(newUserData);
          closeAllPopups();
        })
        .catch((err) => {
          console.log(err + ' , нам очень жаль');
        });

  }
  
  function handleAddPlaceSubmit(newDataOfCard) {
    const newPromise = api.addNewCard(newDataOfCard)
        .then((newCardData) => {
          setCards([newCardData, ...cards]);
        });
    return newPromise;
  }
  
  function handleUpdateAvatar(newDataOfAvatar) {
    const newPromise = api.changeAvatar(newDataOfAvatar)
        .then((newAvatarData) => {
          setCurrentUser(newAvatarData);
          closeAllPopups();
        })
        .catch((err) => {
          console.log(err + ' , нам очень жаль');
        });
    return newPromise;
  }

  function handleCardLike({likes, _id}) {
    const isLiked = likes.some(item => item._id === currentUser._id);
    api.changeLikeCardStatus(_id, !isLiked).then((newCard) => {
      // Формируем новый массив на основе имеющегося, подставляя в него новую карточку
      const newCards = cards.map((item) => item._id === _id ? newCard : item);
      // Обновляем стейт
      setCards(newCards);
    }) .catch((err) => {
      console.log(err + ' , нам очень жаль');
    });
  }

  function handleCardDelete(cardId) {
    api.deleteCard(cardId).then(() => {
      const newCards = cards.filter((item) => item._id !== cardId);
      setCards(newCards);
    }) .catch((err) => {
      console.log(err + ' , нам очень жаль');
    });
  }

  //изменение теукщего состояния массива карточек
  const setCardData = (cardsData) => {
    setCards(cardsData);
  };

  React.useEffect(() => {
    const cardsInfo = api.getInitialCards();
    cardsInfo
        .then((initialCards) => {
          setCardData(initialCards) //получение данных карточек с сервера и орисовка на страницу
        })
        .catch((err) => {
          console.log(err + ' , нам очень жаль');
        });
  }, []);

  const handlerEscKeydown = (evt) => {
    if (evt.key === "Escape") {
      closeAllPopups();
    }
  };

  //закрытие попапа по нажатию на Esc
  React.useEffect(() => {
    document.addEventListener('keydown', handlerEscKeydown);
    return() => {
      document.removeEventListener('keydown', handlerEscKeydown);
    }
  }, []);


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
            cards={cards}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
        />

        <Footer />

        <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser}/>

        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar}/>

        <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit}/>


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
