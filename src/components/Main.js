import React from "react";
import editAvatarImage from '../images/edit-avatar.svg';
import editButtonImage from '../images/edit-button.svg';
import addButtonImage from '../images/add-button.svg';

function Main() {
    function handleEditAvatarClick() {
        document.querySelector('.popup_edit-avatar').classList.add('popup_opened');
    }

    function handleEditProfileClick() {
        document.querySelector('.popup_edit-profile').classList.add('popup_opened');
    }

    function handleAddPlaceClick() {
        document.querySelector('.popup_add-card').classList.add('popup_opened');
    }
    
    return(
        <main className="content">

            <section className="profile">

                <div className="profile__container">
                    <div className="profile__avatar-container" onClick={handleEditAvatarClick}>
                        <img src="#" className="profile__avatar" alt="аватар"/>
                        <div className="profile__edit-avatar-container">
                            <img src={editAvatarImage} alt="карандаш"/>
                        </div>
                    </div>
                    <div className="profile__info">
                        <div className="profile__main-information">
                            <h1 className="profile__name"></h1>
                            <button className="profile__edit-button defocus" type="button" onClick={handleEditProfileClick}>
                                <img src={editButtonImage} alt="карандаш"/>
                            </button>
                        </div>
                        <p className="profile__occupation"></p>
                    </div>
                </div>
                <button className="profile__add-button defocus" type="button" onClick={handleAddPlaceClick}>
                    <img src={addButtonImage} className="profile__vector-image" alt="знак плюс"/>
                </button>
            </section>

            <section className="elements">

            </section>

        </main>
    )
}

export default Main;