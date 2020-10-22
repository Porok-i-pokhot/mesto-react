import PopupWithForm from "./PopupWithForm";
import React from "react";

function AddPlacePopup({isOpen, onClose, onAddPlace}) {

    const [title, setTitle] = React.useState('');
    const [link, setLink] = React.useState('');

    function handleChangeTitle(evt) {
        setTitle(evt.target.value);
    }

    function handleChangeLink(evt) {
        setLink(evt.target.value);
    }

    function handleSubmit(evt) {
        evt.preventDefault();

        onAddPlace({
            name: title,
            link: link
        });
    }
    
    return(
        <PopupWithForm
            title='Новое место'
            name='add-card'
            buttonTitle='Сохранить'
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
            children={
                <>
                    <input className="popup__input popup__input_type_place" type="text" placeholder="Название" name="place"
                           required minLength="1" maxLength="30" autoComplete="off" onChange={handleChangeTitle}/>
                    <span id='place-error'/>

                    <input className="popup__input popup__input_type_link" type="url" placeholder="Ссылка на картинку"
                           name="link" required autoComplete="off" onChange={handleChangeLink}/>
                    <span id='link-error'/>

                </>
            }
        />
    )
}

export default AddPlacePopup;
