import React from "react";
import editAvatarImage from '../images/edit-avatar.svg';
import editButtonImage from '../images/edit-button.svg';
import addButtonImage from '../images/add-button.svg';

function Main({onEditProfile, onAddPlace, onEditAvatar}) {

    
    return(
        <main className="content">

            <section className="profile">

                <div className="profile__container">
                    <div className="profile__avatar-container" onClick={onEditAvatar}>
                        <img src="#" className="profile__avatar" alt="аватар"/>
                        <div className="profile__edit-avatar-container">
                            <img src={editAvatarImage} alt="карандаш"/>
                        </div>
                    </div>
                    <div className="profile__info">
                        <div className="profile__main-information">
                            <h1 className="profile__name"></h1>
                            <button className="profile__edit-button defocus" type="button" onClick={onEditProfile}>
                                <img src={editButtonImage} alt="карандаш"/>
                            </button>
                        </div>
                        <p className="profile__occupation"></p>
                    </div>
                </div>
                <button className="profile__add-button defocus" type="button" onClick={onAddPlace}>
                    <img src={addButtonImage} className="profile__vector-image" alt="знак плюс"/>
                </button>
            </section>

            <section className="elements">

            </section>

        </main>
    )
}

export default Main;