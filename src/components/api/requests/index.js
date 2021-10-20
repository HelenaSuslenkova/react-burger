import { API_URL } from '../settings';

export function getData() {
  const URL = `${API_URL}/ingredients`;
  return fetch(URL)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Response status: ${response.status} : ${response.statusText}`);
      }

      return response.json()
    })
    .then(({ data }) => {
        return data;
    })
    .catch((e) => {
      console.log(e);
    });
}

export function getOrderDetails(ingredientIds = ['60d3b41abdacab0026a733c6']) {
  const body = {
    "ingredients": ingredientIds,
  }

  const URL = `${API_URL}/orders`;

  return fetch(URL, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Response status: ${response.status} ${response.statusText}`);
      }

      return response.json();
    })
    .then((data) => {
      return data;
    })
    .catch((e) => {
      console.log(e);
    });
}
