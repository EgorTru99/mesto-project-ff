import { createCard } from "./scripts/card.js";
import { fetchCardsList, fetchProfileData, updateProfileData, createCard as fetchCreateCard, updateAvatar } from "./scripts/api.js";
import { openModal, closeModal } from "./scripts/modal.js";
import { configValidation, enableValidation, clearValidation } from "./scripts/validation.js";
import "./scripts/modal.js";

// УЗЛЫ
// место расположения карточек
const places = document.querySelector(".places");
const placesList = places.querySelector(".places__list");
// Информация в профиле
const profileTitle = document.querySelector(".profile__title");
const profileImage = document.querySelector(".profile__image");
const profileDescription = document.querySelector(".profile__description");
// Попап добавления новой карточки
const addButton = document.querySelector(".profile__add-button");
const popupTypeNewCard = document.querySelector(".popup_type_new-card");
const popupTypeNewCardForm = popupTypeNewCard.querySelector(".popup__form");
const popupTypeNewCardInputName = popupTypeNewCard.querySelector(".popup__input_type_card-name");
const popupTypeNewCardInputURL = popupTypeNewCard.querySelector(".popup__input_type_url");
const popupTypeNewCardSubmitButton = popupTypeNewCard.querySelector(".popup__button");
// Попап редактирования профиля
const editButton = document.querySelector(".profile__edit-button");
const popupTypeEdit = document.querySelector(".popup_type_edit");
const popupTypeEditForm = popupTypeEdit.querySelector(".popup__form");
const popupTypeEditTitle = popupTypeEditForm.querySelector(".popup__input_type_name");
const popupTypeEditDescription = popupTypeEditForm.querySelector(".popup__input_type_description");
const popupTypeEditSubmitButton = popupTypeEditForm.querySelector(".popup__button");
// Попап изображения карточки
const popupTypeImage = document.querySelector(".popup_type_image");
const popupImagePicture = popupTypeImage.querySelector(".popup__image");
const popupImageCaption = popupTypeImage.querySelector(".popup__caption");
// Попап редактирования аватара
const editAvatarButton = document.querySelector(".edit-avatar");
const popupTypeEditAvatar = document.querySelector(".popup_type_edit-avatar");
const popupTypeEditAvatarForm = popupTypeEditAvatar.querySelector(".popup__form");
const popupTypeEditAvatarSubmitButton = popupTypeEditAvatarForm.querySelector(".popup__button");
const popupTypeEditAvatarInputURL = popupTypeEditAvatar.querySelector(".popup__input_type_url");


// user_id
let userId;


// добавление попапа на кнопку "редактировать"
editButton.addEventListener("click", () => {
  // заполнение формы редактирования текущей информацией пользователя
 fillUserEditForm();
 clearValidation(popupTypeEditForm, configValidation);
 popupTypeEditForm.querySelector('.button').classList.remove('button_inactive');
 openModal(popupTypeEdit);
});

// добавление попапа на кнопку "добавить карточку"
addButton.addEventListener("click", () => {
  openModal(popupTypeNewCard);
  clearValidation(popupTypeNewCardForm, configValidation);
  // очистка формы
  resetForm(popupTypeNewCardForm);
  popupTypeNewCardForm.querySelector('.button').classList.add('button_inactive');
});

// добавление попапа на кнопку "редактировать аватар"
editAvatarButton.addEventListener("click", () => {
  openModal(popupTypeEditAvatar);
  clearValidation(popupTypeEditAvatarForm, configValidation);
  // очистка формы 
  resetForm(popupTypeEditAvatarForm);
  popupTypeEditAvatarForm.querySelector('.button').classList.add('button_inactive');
});

// добавление на формы функции САБМИТ
popupTypeNewCardForm.addEventListener("submit", handleAddNewCardFormSubmit);
popupTypeEditForm.addEventListener("submit", handleEditFormSubmit);
popupTypeEditAvatar.addEventListener("submit", handleEditAvatarFormSubmit);

// очистка формы попапа
function resetForm(form) {
  form.reset();
}

// Добавление новой карточки через попап
function handleAddNewCardFormSubmit(event) {
  event.preventDefault();

  const initialTextContent = popupTypeNewCardSubmitButton.textContent;
  popupTypeNewCardSubmitButton.textContent = 'Сохранение...';
  popupTypeNewCardSubmitButton.disabled = true;

  fetchCreateCard({name: popupTypeNewCardInputName.value, link: popupTypeNewCardInputURL.value}).then(card => {
    placesList.prepend(createCard(card, userId, openModal, onImageClick));
    
    closeModal();
  }).catch(err => {
    console.log(err)
  }).finally(() => {
    popupTypeNewCardSubmitButton.textContent = initialTextContent
    popupTypeNewCardSubmitButton.disabled = false;
  })
}

// Редактирование имени и информации профиля через попап
function handleEditFormSubmit(event) {
  event.preventDefault();

  const initialTextContent = popupTypeEditSubmitButton.textContent;
  popupTypeEditSubmitButton.textContent = 'Сохранение...';
  popupTypeEditSubmitButton.disabled = true;

  updateProfileData({name: popupTypeEditTitle.value, about: popupTypeEditDescription.value}).then((userData) => {
    fillProfileData(userData);

    closeModal();
  }).catch(err => {
    console.log(err);
  }).finally(() => {
    popupTypeEditSubmitButton.textContent = initialTextContent
    popupTypeEditSubmitButton.disabled = false;
  })
}

function handleEditAvatarFormSubmit(event) {
  event.preventDefault();

  const initialTextContent = popupTypeEditAvatarSubmitButton.textContent;
  popupTypeEditAvatarSubmitButton.textContent = 'Сохранение...';
  popupTypeEditAvatarSubmitButton.disabled = true;

  updateAvatar(popupTypeEditAvatarInputURL.value).then((userData) => {
    fillProfileData(userData);
    closeModal();
  }).catch(err => {
    console.log(err);
  }).finally(() => {
    popupTypeEditAvatarSubmitButton.textContent = initialTextContent
    popupTypeEditAvatarSubmitButton.disabled = false;
  })
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

function fillProfileData(userData) {
  profileImage.style = `background-image: url(${userData.avatar})`;
  profileTitle.textContent = userData.name;
  profileDescription.textContent = userData.about;
  userId = userData._id; 
}

//////////////////////////////////////
enableValidation(configValidation);

// Получаем данные текущего профиля пользователя и список карточек
Promise.all([fetchProfileData(), fetchCardsList()]).then(([userData, cardsList]) => {
  fillProfileData(userData);
  cardsList.forEach(card => placesList.append(createCard(card, userId, openModal, onImageClick)))
}).catch((err) => {
  console.log(err);
})