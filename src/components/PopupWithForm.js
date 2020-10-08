import React from "react";
import closeIcon from '../images/close-icon.svg';

function PopupWithForm({title, name, buttonTitle, children, isOpen, onClose}) {

    // const handler = (evt) => {
    //     if(evt.key === "Escape") {
    //         this.close();
    //     }

    return (
        <div className={`popup popup_${name} ${isOpen ? 'popup_opened' : ''}`}>
            <div className="popup__container">
                <button className="popup__close-icon defocus" type="button" onClick={onClose}>
                    <img src={closeIcon} className="popup__close-icon-image" alt="крестик"/>
                </button>
                <h2 className="popup__title">{title}</h2>
                <form className="popup__form" action="#" name={name} noValidate>
                    {children}
                    <button type="submit"
                            className="popup__form-button popup__form-button_disabled defocus"
                            onClick={onClose}
                            disabled>{buttonTitle}
                    </button>
                </form>
            </div>
        </div>
    )
}

export default PopupWithForm;