import { createCard, placesList, likeCard } from "./card.js";

export const popupTypeEdit = document.querySelector(".popup_type_edit");
export const popupTypeNewCard = document.querySelector(".popup_type_new-card");

export const profileTitle = document.querySelector(".profile__title");
export const profileDescription = document.querySelector(
  ".profile__description"
);

const editTitle = popupTypeEdit.querySelector(".popup__input_type_name");
const editDescription = popupTypeEdit.querySelector(
  ".popup__input_type_description"
);

//закрытие попапа
const closeModal = (popup) => {
  popup.classList.add("popup_is-animated");
  popup.classList.remove("popup_is-opened");
};

const addPopupCloseListeners = (popup) => {
  //закрытие попапа на крестик
  popup
    .querySelector(".popup__content")
    .querySelector(".popup__close")
    .addEventListener("click", function (event) {
      closeModal(popup);
    });
  //закрытие попапа на esc
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      closeModal(popup);
    }
  });
  //закрытие попапа при клике на БГ
  popup.addEventListener("click", function (event) {
    if (event.currentTarget === event.target) {
      closeModal(popup);
    }
  });
  //отчистка формы попапа при закрытии попапов
  if (
    popup.classList.contains("popup_type_edit") ||
    popup.classList.contains("popup_type_new-card")
  ) {
    clearForm(popup);
  }
};

//очистка формы попапа
const clearForm = (popup) => {
  popup.querySelectorAll(".popup__input").forEach((element) => {
    element.value = "";
  });
};

//заполнить плейсхолдер текущими именем и описанием профиля
export const fillPopupPlaceHolderEdit = (profileTitle, profileDescription) => {
  editTitle.placeholder = profileTitle.textContent;
  editDescription.placeholder = profileDescription.textContent;
};

//метод открытия попапа
export const attachPopupToElement = (element, popup) => {
  popup.classList.add("popup_is-animated");
  element.addEventListener("click", function (event) {
    event.preventDefault();
    popup.classList.add("popup_is-opened");
    addPopupCloseListeners(popup);
  });
};

//Редактирование имени и информации профиля через попап
const handleFormSubmitEdit = (event, popup) => {
  event.preventDefault();
  profileTitle.textContent = editTitle.value;
  profileDescription.textContent = editDescription.value;
  closeModal(popup);
  fillPopupPlaceHolderEdit(profileTitle, profileDescription);
};
popupTypeEdit
  .querySelector(".popup__form")
  .addEventListener("submit", (event) =>
    handleFormSubmitEdit(event, popupTypeEdit)
  );

//Добавление новой карточки через попап
const handleFormSubmitAddNewCard = (event, popup) => {
  event.preventDefault();
  placesList.prepend(
    createCard(
      popup.querySelector(".popup__input_type_card-name").value,
      popup.querySelector(".popup__input_type_url").value,
      likeCard,
      attachPopupToElement
    )
  );
  closeModal(popup);
};
popupTypeNewCard
  .querySelector(".popup__form")
  .addEventListener("submit", (event) =>
    handleFormSubmitAddNewCard(event, popupTypeNewCard)
  );
