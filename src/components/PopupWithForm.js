import React from "react";
import closeIcon from '../images/close-icon.svg';

function PopupWithForm({title, name, buttonTitle, children, isOpen, onClose, onSubmit}) {

    //закрытие попапо по клику на оверлэй
    const handlerOverlayClick = (evt) => {
        const isPopup = evt.target.classList.contains('popup');
        if (isPopup) {
            onClose();
        }
    };

    return (
        <div className={`popup popup_${name} ${isOpen ? 'popup_opened' : ''}`} onClick={handlerOverlayClick}>
            <div className="popup__container">
                <button className="popup__close-icon defocus" type="button" onClick={onClose}>
                    <img src={closeIcon} className="popup__close-icon-image" alt="крестик"/>
                </button>
                <h2 className="popup__title">{title}</h2>
                <form className="popup__form" action="#" name={name} noValidate onSubmit={onSubmit}>
                    {children}
                    <button type="submit"
                            className="popup__form-button defocus"
                            onClick={onClose}>{buttonTitle}
                    </button>
                </form>
            </div>
        </div>
    )
}

export default PopupWithForm;