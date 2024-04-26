export const AUTH_TOKEN = "b8c0dc67-4906-4777-ab99-d952e48672e0";

const baseConfig = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-11",
  headers: {
    authorization: AUTH_TOKEN,
  },
};

function request(endpoint, config = { method: "GET" }) {
  return fetch(`${baseConfig.baseUrl}${endpoint}`, {
    ...baseConfig,
    ...config,
    headers: { ...baseConfig.headers, ...(config.headers ?? {}) },
  }).then((response) => {
    if (response.ok) {
      return response.json();
    }

    throw new Error(`Network error - ${response.status}`);
  });
}

function fetchCardsList() {
  return request("/cards");
}

function fetchLikeCard(cardId) {
  return request(`/cards/likes/${cardId}`, { method: "PUT" })
}

function fetchUnLikeCard(cardId) {
  return request(`/cards/likes/${cardId}`, { method: "DELETE" })
}

function fetchDeleteCard(cardId) {
  return request(`/cards/${cardId}`, { method: "DELETE" })
}

function fetchProfileData() {
  return request("/users/me");
}

function updateProfileData(user) {
  return request("/users/me", {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  });
}

function createCard(card) {
  return request ('/cards', {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(card),
  })
}

function updateAvatar(avatar) {
  return request ('/users/me/avatar', {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({avatar}),
  })
}

export {
  fetchCardsList,
  updateProfileData,
  fetchDeleteCard,
  fetchLikeCard,
  fetchUnLikeCard,
  fetchProfileData,
  createCard,
  updateAvatar
};