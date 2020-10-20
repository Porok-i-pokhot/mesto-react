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

    function handleCardLike(card) {
        const isLiked = card.likes.some(i => i._id === currentUser._id);

        // Отправляем запрос в API и получаем обновлённые данные карточки
        api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
            // Формируем новый массив на основе имеющегося, подставляя в него новую карточку
            const newCards = cards.map((c) => c._id === card._id ? newCard : c);
            // Обновляем стейт
            setCards(newCards);
        });
    }

    //изменение теукщего состояния массива карточек
    const setCardData = (cardsData) => {
        setCards(cardsData);
    }

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
                {cards.map(({_id, ...item}) => (
                    <Card key={_id} {...item} onCardClick={onCardClick}/>
                    )
                )}
            </section>

        </main>
    )
}

export default Main;