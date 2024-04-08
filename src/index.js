import { initialCards } from "./scripts/cards.js";
import { createCard, placesList, likeCard } from "./scripts/card.js";
import { attachPopupToElement, closeModal } from "./scripts/modal.js";
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
const popupCard = document.querySelector(".popup_type_image");
const popupImage = popupCard.querySelector(".popup__image");
const popupCaption = popupCard.querySelector(".popup__caption");
// Карточки
const cards = document.querySelectorAll('.card');

// добавление открытия попапов на кнопки
attachPopupToElement(addButton, popupTypeNewCard);
attachPopupToElement(editButton, popupTypeEdit);

// очистка формы добавления новой карточки
addButton.addEventListener("click", () => resetForm(popupTypeNewCardForm));

// за формы добавления новой карточки
editButton.addEventListener("click", fillUserEditForm);

// добавление на формы возможности САБМИТ
popupTypeNewCardForm.addEventListener("submit", handleAddNewCardFormSubmit);
popupTypeEditForm.addEventListener("submit", handleEditFormSubmit);

// Вывести карточки на страницу
initialCards.forEach(function (initialCards) {
  placesList.append(createCard(initialCards.name, initialCards.link, likeCard, attachPopupToElement));
});

// функция заполнения попапа_карточки
export function fillPopupImage(name, link) {
  popupImage.src = link;
  popupImage.alt = name;
  popupCaption.textContent = name;
}

// очистка формы попапа
function resetForm(form) {
  form.reset();
}

// Добавление новой карточки через попап
function handleAddNewCardFormSubmit(event) {
  event.preventDefault();
  placesList.prepend(createCard(popupTypeNewCardInputName.value, popupTypeNewCardInputURL.value, likeCard, attachPopupToElement));
  closeModal();
}

// Редактирование имени и информации профиля через попап
function handleEditFormSubmit(event) {
  event.preventDefault();
  profileTitle.textContent = popupTypeEditTitle.value;
  profileDescription.textContent = popupTypeEditDescription.value;
  closeModal();
}

function fillUserEditForm() {
  // Заполнить value в форме edit попапа текущими именем и описанием профиля
  popupTypeEditTitle.value = profileTitle.textContent;
  popupTypeEditDescription.value = profileDescription.textContent;
}