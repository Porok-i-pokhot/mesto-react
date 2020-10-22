import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({isOpen, onClose, onUpdateAvatar}) {

    const inputRef = React.useRef();

    function handleSubmit(evt) {
        evt.preventDefault();
debugger
        onUpdateAvatar({
            avatar: inputRef.current.value
        });
    }

    return(
        <PopupWithForm
            title='Обновить аватар'
            name='edit-avatar'
            buttonTitle='Сохранить'
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
            children={
                <>
                    <input className="popup__input popup__input_type_link" type="url" placeholder="Ссылка на аватар"
                           name="avatar" required autoComplete="off" ref={inputRef}/>
                    <span id='avatar-error'/>

                </>
            }
        />
    )

}

export default EditAvatarPopup;
