import React from "react";
import editAvatarImage from '../images/edit-avatar.svg';
import editButtonImage from '../images/edit-button.svg';
import addButtonImage from '../images/add-button.svg';
import {api} from '../utils/api.js';
import Card from './Card.js';

function Main({onEditProfile, onAddPlace, onEditAvatar, onCardClick}) {

    const [userName, setUserName] = React.useState('');
    const [userDescription, setUserDescription] = React.useState('');
    const [userAvatar, setUserAvatar] = React.useState('');
    const [cards, setCards] = React.useState([]);

    //изменение текущих значений переменных состояния данных пользователя
    const setUserData = (userData) => {
        setUserName(userData.name);
        setUserDescription(userData.about);
        setUserAvatar(userData.avatar);
    };

    //изменение теукщего состояния массива карточек
    const setCardData = (cardsData) => {
        setCards(cardsData);
    }

    React.useEffect(() => {
        const cardsAndUserInfo = Promise.all([api.getInitialCards(), api.getUserInfo()]);
        cardsAndUserInfo
            .then(([initialCards, userData]) => {
                setUserData(userData); //получение данных пользователя с сервера и отрисовка на страницу
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
                        <img src={userAvatar} className="profile__avatar" alt="аватар"/>
                        <div className="profile__edit-avatar-container">
                            <img src={editAvatarImage} alt="карандаш"/>
                        </div>
                    </div>
                    <div className="profile__info">
                        <div className="profile__main-information">
                            <h1 className="profile__name">{userName}</h1>
                            <button className="profile__edit-button defocus" type="button" onClick={onEditProfile}>
                                <img src={editButtonImage} alt="карандаш"/>
                            </button>
                        </div>
                        <p className="profile__occupation">{userDescription}</p>
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