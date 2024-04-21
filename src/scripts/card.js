import "../pages/index.css";
import { fetchDeleteCard, fetchLikeCard, fetchUnLikeCard } from './api'

// Темплейт карточки
const cardTemplateContent = document.querySelector("#card-template").content;
// DOM узлы
const places = document.querySelector(".places");
const placesList = places.querySelector(".places__list");

//функция удаления карточки
const deleteCard = (cardId, cardElement, event) => {
  event.stopPropagation(); 

  fetchDeleteCard(cardId).then(() => cardElement.remove())
}

//функция заполнения карточки
const fillCard = (cardElement, card) => {
  const { name, link, likes, owner } = card;

  const isLikedByMe = likes.find(like => like._id === 'b8c0dc67-4906-4777-ab99-d952e48672e0');

  cardElement.querySelector(".card__image").src = link;
  cardElement.querySelector(".card__image").alt = name;
  cardElement.querySelector(".card__title").textContent = name;
  
  if (isLikedByMe) {
    // TODO: Переключить активное состояния лайка
  }

  // TODO: вставить likes amount

  if (owner._id !== 'b8c0dc67-4906-4777-ab99-d952e48672e0') {
    // TODO: Убрать кнопку удаления
  }
}

//функция лайка карточки
export const likeCard = (cardId, cardElement, event) => {
  event.stopPropagation(); 

  const likeButton = cardElement.querySelector(".card__like-button");

  if (likeButton.classList.contains("card__like-button_is-active")){
    fetchUnLikeCard(cardId).then(() => likeButton.classList.remove("card__like-button_is-active"))
  } else {
    fetchLikeCard(cardId).then(() => likeButton.classList.add("card__like-button_is-active"))
  }
}

// @todo: Функция создания карточки
function createCard(card, onModalOpen, onImageClick) {
  const { name, link, likes, owner } = card;

  const cardElement = cardTemplateContent.querySelector(".card").cloneNode(true);

  //заполнение карточки
  fillCard(cardElement, card);

  //добавление листнера удаления
  cardElement.querySelector(".card__delete-button")?.addEventListener("click", (event) => deleteCard(card._id, cardElement, event));

  //добавление листнера лайка
  cardElement.querySelector(".card__like-button").addEventListener("click", (event) => likeCard(card._id, cardElement, event));
  
  //Добавление обработчика клика на картинку
  cardElement.querySelector(".card__image").addEventListener("click", () => onImageClick(name, link));

  return cardElement;
}

export { createCard, placesList };