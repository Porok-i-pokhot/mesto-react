import React from "react";
import closeIcon from '../images/close-icon.svg';


function ImagePopup() {
    return (
        <div className="popup popup_show-image">
            <div className="popup__container-img">
                <button className="popup__close-icon defocus" type="button">
                    <img src={closeIcon} className="popup__close-icon-image" alt="крестик"/>
                </button>
                <figure className="popup__shell-image">
                    <img className="popup__image" src="#" alt="#"/>
                    <figcaption className="popup__title-img"></figcaption>
                </figure>
            </div>
        </div>
    )
}

export default ImagePopup;