import "../pages/index.css";
import { AUTH_TOKEN, fetchDeleteCard, fetchLikeCard, fetchUnLikeCard } from './api'

// Темплейт карточки
const cardTemplateContent = document.querySelector("#card-template").content;

//функция удаления карточки
const deleteCard = (cardId, cardElement, userId, event) => {
  event.stopPropagation(); 

  fetchDeleteCard(cardId).then(() => cardElement.remove()).catch(err => {
    // TODO: обработка ошибки
  })
}

//функция заполнения карточки
const fillCard = (cardElement, card, userId) => {
  const { name, link, likes, owner } = card;

  const isLikedByMe = likes.find(like => like._id === userId);

  const likeButton = cardElement.querySelector(".card__like-button");

  cardElement.querySelector(".card__image").src = link;
  cardElement.querySelector(".card__image").alt = name;
  cardElement.querySelector(".card__title").textContent = name;
  cardElement.querySelector(".number_likes").textContent = likes.length;

  if (isLikedByMe) {
    likeButton?.classList?.add("card__like-button_is-active")
  } else {
    likeButton?.classList?.remove("card__like-button_is-active")
  }


  if (owner._id !== userId) {
    const deleteButton = cardElement.querySelector(".card__delete-button");

    if (deleteButton) {
      deleteButton.style.display = 'none';
    }
  }
}

//функция лайка карточки
export const likeCard = (cardId, cardElement, userId, event) => {
  event.stopPropagation(); 

  const likeButton = cardElement.querySelector(".card__like-button");
  const isAlreadyLiked = likeButton.classList.contains("card__like-button_is-active");

  if (isAlreadyLiked){
    fetchUnLikeCard(cardId).then((card) => fillCard(cardElement, card, userId)).catch(err => {
      console.log(err);
    })
  } else {
    fetchLikeCard(cardId).then((card) => fillCard(cardElement, card, userId)).catch(err => {
      console.log(err);
    })
  }
}

// @todo: Функция создания карточки
function createCard(card, currentUserId, onModalOpen, onImageClick) {
  const { name, link, likes, _id, owner } = card;

  const cardElement = cardTemplateContent.querySelector(".card").cloneNode(true);

  //заполнение карточки
  fillCard(cardElement, card, currentUserId);

  //добавление листнера удаления
  cardElement.querySelector(".card__delete-button")?.addEventListener("click", (event) => deleteCard(_id, cardElement, currentUserId, event));

  //добавление листнера лайка
  cardElement.querySelector(".card__like-button").addEventListener("click", (event) => likeCard(_id, cardElement, currentUserId, event));
  
  //Добавление обработчика клика на картинку
  cardElement.querySelector(".card__image").addEventListener("click", () => onImageClick(name, link));

  return cardElement;
}

export { createCard };