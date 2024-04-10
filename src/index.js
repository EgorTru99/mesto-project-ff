import { initialCards } from "./scripts/cards.js";
import { createCard, placesList, likeCard } from "./scripts/card.js";
import { openModal, closeModal } from "./scripts/modal.js";
import "./scripts/modal.js";

// УЗЛЫ
// Кнопки добавления карточки и редактирования профиля
const addButton = document.querySelector(".profile__add-button");
const editButton = document.querySelector(".profile__edit-button");
// Информация в профиле
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
// Попап добавления новой карточки
const popupTypeNewCard = document.querySelector(".popup_type_new-card");
const popupTypeNewCardForm = popupTypeNewCard.querySelector(".popup__form");
const popupTypeNewCardInputName = popupTypeNewCard.querySelector(".popup__input_type_card-name");
const popupTypeNewCardInputURL = popupTypeNewCard.querySelector(".popup__input_type_url");
// Попап редактирования профиля
const popupTypeEdit = document.querySelector(".popup_type_edit");
const popupTypeEditForm = popupTypeEdit.querySelector(".popup__form");
const popupTypeEditTitle = popupTypeEditForm.querySelector(".popup__input_type_name");
const popupTypeEditDescription = popupTypeEditForm.querySelector(".popup__input_type_description");
// Попап изображения карточки
const popupTypeImage = document.querySelector(".popup_type_image");
const popupImagePicture = popupTypeImage.querySelector(".popup__image");
const popupImageCaption = popupTypeImage.querySelector(".popup__caption");

// добавление попапа на кнопку "редактировать"
editButton.addEventListener("click", () => {
  // заполнение формы редактирования текущей информацией пользователя
 fillUserEditForm();
 openModal(popupTypeEdit);
});

// добавление попапа на кнопку "добавить карточку"
addButton.addEventListener("click", () => {
  openModal(popupTypeNewCard);
  // очистка формы добавления новой карточки 
  resetForm(popupTypeNewCardForm);
});

// добавление на формы функции САБМИТ
popupTypeNewCardForm.addEventListener("submit", handleAddNewCardFormSubmit);
popupTypeEditForm.addEventListener("submit", handleEditFormSubmit);

// Вывести массив карточек на страницу
initialCards.forEach(function (initialCard) {
  const cardFromMass = createCard(initialCard.name, initialCard.link, likeCard, openModal, onImageClick);
  placesList.append(cardFromMass);
});

// очистка формы попапа
function resetForm(form) {
  form.reset();
}

// Добавление новой карточки через попап
function handleAddNewCardFormSubmit(event) {
  event.preventDefault();
  const cardFromAddButton = createCard(popupTypeNewCardInputName.value, popupTypeNewCardInputURL.value, likeCard, openModal, onImageClick);
  placesList.prepend(cardFromAddButton);
  closeModal();
}

// Редактирование имени и информации профиля через попап
function handleEditFormSubmit(event) {
  event.preventDefault();
  profileTitle.textContent = popupTypeEditTitle.value;
  profileDescription.textContent = popupTypeEditDescription.value;
  closeModal();
}

// Заполнить value в форме edit попапа текущими именем и описанием профиля
function fillUserEditForm() {
  popupTypeEditTitle.value = profileTitle.textContent;
  popupTypeEditDescription.value = profileDescription.textContent;
}

// функция заполнения попапа_карточки
function fillPopupImage(name, link) {
  popupImagePicture.src = link;
  popupImagePicture.alt = name;
  popupImageCaption.textContent = name;
}

// Метод открывания попапа карточки  
function onImageClick(name, link) {
  openModal(popupTypeImage);
  fillPopupImage(name, link);
}