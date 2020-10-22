import PopupWithForm from "./PopupWithForm";
import React from "react";
import {CurrentUserContext} from "../contexts/CurrentUserContext";


function EditProfilePopup({isOpen, onClose, onUpdateUser}) {

    const [name, setName] = React.useState('');
    const [description, setDescription] = React.useState('');

    const currentUser = React.useContext(CurrentUserContext);

    React.useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser]);

    function handleChangeName(evt) {
        setName(evt.target.value);
    }

    function handleChangeDescription(evt) {
        setDescription(evt.target.value);
    }

    function handleSubmit(evt) {
        evt.preventDefault();

        onUpdateUser({
            name: name,
            about: description
        });
    }

    return (
        <PopupWithForm
            title='Редактировать профиль'
            name='edit-profile'
            buttonTitle='Сохранить'
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
            children={
                <>
                    <input className="popup__input popup__input_type_name" type="text" placeholder="Имя"
                           name="name" required minLength="2" maxLength="40" autoComplete="off"
                           value={name} onChange={handleChangeName}/>
                    <span id='name-error'/>

                    <input className="popup__input popup__input_type_occupation" type="text"
                           placeholder="О себе" name="job" required minLength="2" maxLength="200" autoComplete="off"
                           value={description} onChange={handleChangeDescription}/>
                    <span id='job-error'/>

                </>
            }
        />
    )
}

export default EditProfilePopup;