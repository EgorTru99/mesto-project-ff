import "../pages/index.css";

// Темплейт карточки
const cardTemplateContent = document.querySelector("#card-template").content;
// DOM узлы
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

//функция лайка карточки
export const likeCard = (cardElement, event) => {
  event.stopPropagation(); 
  const likeButton = cardElement.querySelector('.card__like-button');
  if (likeButton.classList.contains('card__like-button_is-active')){
    likeButton.classList.remove('card__like-button_is-active');
  } else {
    likeButton.classList.add('card__like-button_is-active');
  }
}

// @todo: Функция создания карточки
function createCard(name, link, likeCard, openModal) {
  const cardElement = cardTemplateContent.querySelector(".card").cloneNode(true);

  //заполнение карточки
  fillCard(cardElement, name, link);

  //добавление листнера удаления
  cardElement.querySelector(".card__delete-button").addEventListener("click", (event) => deleteCard(cardElement, event));

  //добавление листнера лайка
  cardElement.querySelector(".card__like-button").addEventListener("click", (event) => likeCard(cardElement, event));

  return cardElement;
}

export { createCard, placesList };