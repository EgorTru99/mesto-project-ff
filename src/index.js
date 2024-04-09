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

// добавление модуля попапов на кнопки
openModal(addButton, popupTypeNewCard);
openModal(editButton, popupTypeEdit);

// очистка формы добавления новой карточки
addButton.addEventListener("click", () => resetForm(popupTypeNewCardForm));

// заполнение формы добавления новой карточки
editButton.addEventListener("click", fillUserEditForm);

// добавление на формы возможности САБМИТ
popupTypeNewCardForm.addEventListener("submit", handleAddNewCardFormSubmit);
popupTypeEditForm.addEventListener("submit", handleEditFormSubmit);

// Вывести массив карточек на страницу
initialCards.forEach(function (initialCard) {
  const cardFromMass = createCard(initialCard.name, initialCard.link, likeCard, openModal);
  placesList.append(cardFromMass);
  openModal(cardFromMass.querySelector('.card__image'), popupTypeImage);
  cardFromMass.querySelector('.card__image').addEventListener('click', () => fillPopupImage(initialCard.name, initialCard.link))
});

// очистка формы попапа
function resetForm(form) {
  form.reset();
}

// Добавление новой карточки через попап
function handleAddNewCardFormSubmit(event) {
  event.preventDefault();
  const cardFromAddButton = createCard(popupTypeNewCardInputName.value, popupTypeNewCardInputURL.value, likeCard, openModal);
  placesList.prepend(cardFromAddButton);
  openModal(cardFromAddButton.querySelector('.card__image'), popupTypeImage);
  cardFromAddButton.querySelector('.card__image').addEventListener('click', () => fillPopupImage(popupTypeNewCardInputName.value, popupTypeNewCardInputURL.value))
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