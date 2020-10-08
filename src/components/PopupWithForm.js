import React from "react";
import closeIcon from '../images/close-icon.svg';

function PopupWithForm({title, name, children}) {
    return (
        <div className={`popup popup_${name}`}>
            <div className="popup__container">
                <button className="popup__close-icon defocus" type="button">
                    <img src={closeIcon} className="popup__close-icon-image" alt="крестик"/>
                </button>
                <h2 className="popup__title">{title}</h2>
                <form className="popup__form" action="#" name={name} noValidate>
                    {children}
                    <button type="submit" className="popup__form-button popup__form-button_disabled defocus"
                            disabled>Сохранить
                    </button>
                </form>
            </div>
        </div>
    )
}

export default PopupWithForm;