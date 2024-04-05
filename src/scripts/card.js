import "../pages/index.css";
import { attachPopupToElement } from "./modal"; 

// @todo: Темплейт карточки
// @todo: DOM узлы
const places = document.querySelector(".places");
const placesList = places.querySelector(".places__list");

//функция удаления карточки
const deleteCard = (cardElement, event) => {
  event.stopPropagation(); 
  cardElement.remove();
}

//функция заполнения карточки
const fillCard = (cardElement, name, link) => {
  cardElement.querySelector(".card__image").src = link;
  cardElement.querySelector(".card__image").alt = name;
  cardElement.querySelector(".card__title").textContent = name;
}

//функция заполнения попапа_карточки
const fillPopupImage = (popup, name, link) => {
  popup.querySelector(".popup__image").src = link;
  popup.querySelector(".popup__caption").textContent = name;
}

//функция лайка карточки
export const likeCard = (cardElement, event) => {
  event.stopPropagation(); 
  const likeButton = cardElement.querySelector('.card__like-button');
  if (likeButton.classList.contains('card__like-button_is-active')){
    likeButton.classList.remove('card__like-button_is-active');
  } else likeButton.classList.add('card__like-button_is-active');
}

// @todo: Функция создания карточки
function createCard(name, link, likeCard, attachPopupToElement) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const popup = document.querySelector(".popup_type_image");

  //заполнение карточки
  fillCard(cardElement, name, link);

  //добавление листнера удаления
  cardElement.querySelector(".card__delete-button").addEventListener("click", (event) => deleteCard(cardElement, event));

  //добавление листнера лайка
  cardElement.querySelector(".card__like-button").addEventListener("click", (event) => likeCard(cardElement, event));

  //добавление листнера открытия попапа
  attachPopupToElement(cardElement, popup);

  //добавление листнера заполнения попапа_карточки
  cardElement.addEventListener("click", () => fillPopupImage(popup, name, link))

  return cardElement;
}

export { createCard, placesList };