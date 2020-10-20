import React from "react";
import {CurrentUserContext} from "../contexts/CurrentUserContext";

function Card({name, likes, link, owner, _id, onCardClick}) {

    const currentUser = React.useContext(CurrentUserContext);

    const isOwn = owner._id === currentUser._id;

    const cardDeleteButtonClassName =
        `card__delete-button ${isOwn ? '' : 'element__delete_hide'}`
    ;

    const isLiked = likes.some(item => item._id === currentUser._id);

    const cardLikeButtonClassName = `element__like ${isLiked ?  'element__like_active' : ''}`;

    function handleClick() {
        onCardClick({link, name});
    }

    return(
            <div className="element">
                <button className="element__delete defocus"/>
                <div className="element__image" style={{ backgroundImage: `url(${link})` }} onClick={handleClick}/>
                <div className="element__info">
                    <h2 className="element__title">{name}</h2>
                    <div className="element__like-container">
                        <button type="button" className="element__like defocus"/>
                        <p className="element__likes-quantity">{likes.length}</p>
                    </div>
                </div>
            </div>
    )
}
export default Card;