// b8c0dc67-4906-4777-ab99-d952e48672e0
// wff-cohort-11 

const AUTH_TOKEN = 'b8c0dc67-4906-4777-ab99-d952e48672e0';
const profileImage = document.querySelector('.profile__image')

// API
function fetchCardsList () {
  return fetch('https://nomoreparties.co/v1/wff-cohort-11/cards', {
    headers: {
      authorization: AUTH_TOKEN
    }
  })
    .then(res => res.json())
}

function fetchLikeCard (cardId) {
  return fetch(`https://nomoreparties.co/v1/wff-cohort-11/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: {
      authorization: AUTH_TOKEN
    }
  })
  .then(res => res.json())
  .then((card) => {
    // TODO: обновить карточку
  })
}


function fetchUnLikeCard (cardId) {
  return fetch(`https://nomoreparties.co/v1/wff-cohort-11/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: {
      authorization: AUTH_TOKEN
    }
  })
  .then(res => res.json())
  .then((card) => {
    // TODO: обновить карточку
  })
}

function fetchDeleteCard (cardId) {
  return fetch(`https://nomoreparties.co/v1/wff-cohort-11/cards/${cardId}`, {
    method: 'DELETE',
    headers: {
      authorization: AUTH_TOKEN
    }
  })
  .then(res => res.json())
  .then((card) => {
    // TODO: удалить карточку из списка
  })
}

function fetchProfileData () {
  return fetch('https://nomoreparties.co/v1/wff-cohort-11/users/me', {
    headers: {
      authorization: AUTH_TOKEN
    }
  })
    .then(res => res.json())
}

export { fetchCardsList, fetchDeleteCard, fetchLikeCard, fetchUnLikeCard, fetchProfileData } 