import React from "react";
import editAvatarImage from '../images/edit-avatar.svg';
import editButtonImage from '../images/edit-button.svg';
import addButtonImage from '../images/add-button.svg';
import {api} from '../utils/api.js';
import Card from './Card.js';
import {CurrentUserContext} from "../contexts/CurrentUserContext";

function Main({onEditProfile, onAddPlace, onEditAvatar, onCardClick}) {

    const currentUser = React.useContext(CurrentUserContext);

    const [cards, setCards] = React.useState([]);

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
    
    return(
        <main className="content">

            <section className="profile">

                <div className="profile__container">
                    <div className="profile__avatar-container" onClick={onEditAvatar}>
                        <img src={currentUser.avatar} className="profile__avatar" alt="аватар"/>
                        <div className="profile__edit-avatar-container">
                            <img src={editAvatarImage} alt="карандаш"/>
                        </div>
                    </div>
                    <div className="profile__info">
                        <div className="profile__main-information">
                            <h1 className="profile__name">{currentUser.name}</h1>
                            <button className="profile__edit-button defocus" type="button" onClick={onEditProfile}>
                                <img src={editButtonImage} alt="карандаш"/>
                            </button>
                        </div>
                        <p className="profile__occupation">{currentUser.about}</p>
                    </div>
                </div>
                <button className="profile__add-button defocus" type="button" onClick={onAddPlace}>
                    <img src={addButtonImage} className="profile__vector-image" alt="знак плюс"/>
                </button>
            </section>

            <section className="elements">
                {cards.map((item) => (
                    <Card key={item._id} {...item} onCardClick={onCardClick} onCardLike={handleCardLike} onCardDelete={handleCardDelete}/>
                    )
                )}
            </section>

        </main>
    )
}

export default Main;