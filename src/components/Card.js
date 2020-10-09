import React from "react";

function Card({name, likes, link}) {
    debugger;
    return(
            <div className="element">
                <button className="element__delete defocus"/>
                <div className="element__image" style={{ backgroundImage: `url(${link})` }} />
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