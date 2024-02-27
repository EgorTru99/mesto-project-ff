// @todo: Темплейт карточки
// @todo: DOM узлы
const places = document.querySelector('.places');
const placesList = places.querySelector('.places__list');

// @todo: Функция создания карточки
function createCard(nameValue, linkValue){
  let cardTemplate = document.querySelector('#card-template').content;
  let cardElement = cardTemplate.querySelector('.card').cloneNode(true);

  cardElement.querySelector('.card__title').textContent = nameValue;
  cardElement.querySelector('.card__image').src = linkValue;

  placesList.append(cardElement);
};

// @todo: Функция удаления карточки
placesList.addEventListener('click', function (event) {
  if(event.target.classList.contains('card__delete-button')){
    let cardDelete = event.target.closest('.card');
    cardDelete.remove();
  }
});

// @todo: Вывести карточки на страницу
initialCards.forEach(function (initialCards){
  createCard(initialCards.name, initialCards.link);
});