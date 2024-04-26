// настройки валидации
export const configValidation = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}; 

// функция включения проверки валидации форм на странице
export const enableValidation = (configValidation) => {
  const formList = Array.from(document.querySelectorAll(configValidation.formSelector));
  formList.forEach((form) => {
    form.addEventListener('submit', (event) => {
      event.preventDefault();
    });
    setEventListeners(form);
  })
}

// функция включения проверки валидации инпутов в форме
const setEventListeners = (form) => {
  const inputList = Array.from(form.querySelectorAll(configValidation.inputSelector));
  inputList.forEach((input) => {
    input.addEventListener('input', function () {
      checkInputValidity(form, input);
      toggleButtonState(inputList, form.querySelector(configValidation.submitButtonSelector));
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
  // toggle информирования об ошибке
  if (!input.validity.valid) {
    showInputError(form, input, input.validationMessage);
  } else {
    hideInputError(form, input);
  }  
};

// показать информацию об ошибке при вводе данных
const showInputError = (form, input, errorMessage) => {
  const errorElement = form.querySelector(`.${input.id}-error`);
  input.classList.add(configValidation.inputErrorClass);
  errorElement.textContent = errorMessage;
}

// убрать информацию об ошибке при вводе данных
const hideInputError = (form, input) => {
  const errorElement = form.querySelector(`.${input.id}-error`);
  input.classList.remove(configValidation.inputErrorClass);
  errorElement.textContent = '';
};

// проверка формы на наличие ошибок в инпутах
const hasInvalidInput = (inputList) => {
  return inputList.some((input) => {
    return !input.validity.valid;
  })
}

// переключатель состояния кнопки при валидных/инвалидных данных
const toggleButtonState = (inputList, buttonElement) => {
  if(hasInvalidInput(inputList)){
    buttonElement.classList.add(configValidation.inactiveButtonClass);
  } else {
    buttonElement.classList.remove(configValidation.inactiveButtonClass);
  }
}

// очистка информации о валидации
export const clearValidation = (form, configValidation) => {
  const inputList = Array.from(form.querySelectorAll(configValidation.inputSelector));
  inputList.forEach((input) => {
    hideInputError(form, input);
  });
}