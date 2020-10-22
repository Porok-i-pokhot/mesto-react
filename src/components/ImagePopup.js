import React from "react";
import closeIcon from '../images/close-icon.svg';


function ImagePopup({card, isOpen, onClose}) {



    //закрытие попапо по клику на оверлэй
    const handlerOverlayClick = (evt) => {
        const isPopup = evt.target.classList.contains('popup');
        if(isPopup) {
            onClose();
        }
    };

    return (
        <div className={`popup popup_show-image ${isOpen ? 'popup_opened' : ''}`} onClick={handlerOverlayClick}>
            <div className="popup__container-img">
                <button className="popup__close-icon defocus" type="button" onClick={onClose}>
                    <img src={closeIcon} className="popup__close-icon-image" alt="крестик"/>
                </button>
                <figure className="popup__shell-image">
                    <img className="popup__image" src={card.link} alt={card.name}/>
                    <figcaption className="popup__title-img">{card.name}</figcaption>
                </figure>
            </div>
        </div>
    )
}

export default ImagePopup;