import {initialCards} from './scripts/cards.js'
import {createCard, placesList, likeCard} from './scripts/card.js'
import {attachPopupToElement, fillPopupPlaceHolderEdit, popupTypeEdit, popupTypeNewCard, profileTitle, profileDescription} from './scripts/modal.js'
import './scripts/modal.js'

const addButton = document.querySelector(".profile__add-button");
const editButton = document.querySelector(".profile__edit-button");

attachPopupToElement(addButton, popupTypeNewCard);
attachPopupToElement(editButton, popupTypeEdit);
fillPopupPlaceHolderEdit (profileTitle, profileDescription);

// @todo: Вывести карточки на страницу
initialCards.forEach(function (initialCards){
  placesList.append(createCard(initialCards.name, initialCards.link, likeCard, attachPopupToElement));
});