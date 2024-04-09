// Закрытие попапа
export function closeModal() {
  const openedPopup = document.querySelector(".popup_is-opened");
  openedPopup.classList.add("popup_is-animated");
  openedPopup.classList.remove('popup_is-opened');
  removePopupCloseListners(openedPopup);
};

// Убрать слушатели закрытия попапа
function removePopupCloseListners(popup) {
  popup.removeEventListener('click', closePopupByOverlayClick);
  document.removeEventListener('keydown', closePopupByEscKeydown);
  popup.removeEventListener('click', closePopupByOverlayClick);
}

// Закрытие попапа по esc
function closePopupByCloseButton(event) {
  if (event.currentTarget === event.target) {
    closeModal();
  }
}

// Закрытие попапа по esc
function closePopupByEscKeydown(event) {
  if (event.key === "Escape") {
    closeModal();
  }
}

// Закрытие попапа при клике на оверлей
function closePopupByOverlayClick(event) {
  if (event.currentTarget === event.target) {
    closeModal();
  }
}

//Добавить слушатели закрытия попапа
function addPopupCloseListeners(popup) {
  const popupCloseButton =  popup.querySelector(".popup__content").querySelector(".popup__close");
  popupCloseButton.addEventListener("click", closePopupByCloseButton);
  document.addEventListener("keydown", closePopupByEscKeydown);
  popup.addEventListener("click", closePopupByOverlayClick);
};

//Добывление возможности открытия попопа при клике на элемент
export function openModal(element, popup) {
  popup.classList.add("popup_is-animated");
  element.addEventListener("click", () => openPopup(popup));
};

// Открытие попапа
function openPopup(popup){
  popup.classList.add("popup_is-opened");
  addPopupCloseListeners(popup);
}