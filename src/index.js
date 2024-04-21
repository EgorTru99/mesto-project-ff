import { initialCards } from "./scripts/cards.js";
import { createCard, placesList } from "./scripts/card.js";
import { fetchCardsList, fetchProfileData } from "./scripts/api.js";
import { openModal, closeModal } from "./scripts/modal.js";
import "./scripts/modal.js";

// УЗЛЫ
// Кнопки добавления карточки и редактирования профиля
const addButton = document.querySelector(".profile__add-button");
const editButton = document.querySelector(".profile__edit-button");
// Информация в профиле
const profileTitle = document.querySelector(".profile__title");
const profileImage = document.querySelector(".profile__image");
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
 clearValidation(popupTypeEditForm);
 popupTypeEditForm.querySelector('.button').classList.remove('button_inactive');
 openModal(popupTypeEdit);
});

// добавление попапа на кнопку "добавить карточку"
addButton.addEventListener("click", () => {
  openModal(popupTypeNewCard);
  clearValidation(popupTypeNewCardForm);
  // очистка формы добавления новой карточки 
  resetForm(popupTypeNewCardForm);
  popupTypeNewCardForm.querySelector('.button').classList.add('button_inactive');
});

// добавление на формы функции САБМИТ
popupTypeNewCardForm.addEventListener("submit", handleAddNewCardFormSubmit);
popupTypeEditForm.addEventListener("submit", handleEditFormSubmit);

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

// enableValidation({
//   formSelector: '.popup__form',
//   inputSelector: '.popup__input',
//   submitButtonSelector: '.popup__button',
//   inactiveButtonClass: 'popup__button_disabled',
//   inputErrorClass: 'popup__input_type_error',
//   errorClass: 'popup__error_visible'
// }); 

// ///////////////////////////////////////////////////////////////
// const enableCommonValidation = ({
//   formSelector,
//   inputSelector,
//   submitButtonSelector,
//   inactiveButtonClass,
//   inputErrorClass,
//   errorClass
// })  => {
//   const form = document.querySelector(formSelector);
//   // TODO:
// }

// функция включения проверки валидации форм на странице
const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll('.popup__form'));
  formList.forEach((form) => {
    form.addEventListener('submit', (event) => {
      event.preventDefault();
    });
    setEventListeners(form);
  })
}

// функция включения проверки валидации инпутов в форме
const setEventListeners = (form) => {
  const inputList = Array.from(form.querySelectorAll('.popup__input'));
  inputList.forEach((input) => {
    input.addEventListener('input', function () {
      checkInputValidity(form, input);
      toggleButtonState(inputList, form.querySelector('.button'));
    });
  });
};

// проверка валидации инпута
const checkInputValidity = (form, input) => {
  // проверка кастомных ошибок (если не соответсвует регулярке)
  if (input.validity.patternMismatch) {
    input.setCustomValidity(input.dataset.errorMessage);
  } else {
    input.setCustomValidity("");
  }

  if (!input.validity.valid) {
    showInputError(form, input, input.validationMessage);
  } else {
    hideInputError(form, input);
  }  
};

const showInputError = (form, input, errorMessage) => {
  const errorElement = form.querySelector(`.${input.id}-error`);
  input.classList.add('form__input_type_error');
  errorElement.textContent = errorMessage;
}

const hideInputError = (form, input) => {
  const errorElement = form.querySelector(`.${input.id}-error`);
  input.classList.remove('form__input_type_error');
  errorElement.textContent = '';
};

const hasInvalidInput = (inputList) => {
  return inputList.some((input) => {
    return !input.validity.valid;
  })
}

const toggleButtonState = (inputList, buttonElement) => {
  if(hasInvalidInput(inputList)){
    buttonElement.classList.add('button_inactive');
  } else {
    buttonElement.classList.remove('button_inactive');
  }
}

const clearValidation = (form) => {
  const inputList = Array.from(form.querySelectorAll('.popup__input'));
  inputList.forEach((input) => {
    hideInputError(form, input);
  });
}

enableValidation();


// Получаем данные текущего профиля пользователя
fetchProfileData().then((data) => {
  profileImage.src = data.avatar;
  profileTitle.textContent = data.name;
  profileDescription.textContent = data.about;
});

// Получаем список карточек
fetchCardsList().then(cards => {
  cards.forEach(card => placesList.append(createCard(card, openModal, onImageClick)))
});