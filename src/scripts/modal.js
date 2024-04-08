// Закрытие попапа
export function closeModal() {
  const openedPopup = document.querySelector(".popup_is-opened");
  openedPopup.classList.add("popup_is-animated");
  openedPopup.classList.remove("popup_is-opened");
  // Убрать слушатели
  document.removeEventListener('keydown', closePopupByEscKeydown);
  openedPopup.removeEventListener('click', closePopupByOverlayClick);
};

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
  popupCloseButton.addEventListener("click", closeModal);
  document.addEventListener("keydown", closePopupByEscKeydown);
  popup.addEventListener("click", closePopupByOverlayClick);
};

//функция открытия попапа
export function attachPopupToElement(element, popup) {
  popup.classList.add("popup_is-animated");
  element.addEventListener("click", function (event) {
    event.preventDefault();
    popup.classList.add("popup_is-opened");
    addPopupCloseListeners(popup);
  });
};