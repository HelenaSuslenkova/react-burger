import { API_URL } from '../../api/settings';

import {
  USER_REGISTRATION_REQUEST,
  USER_REGISTRATION_SUCCESS,
  USER_REGISTRATION_ERROR,
  USER_AUTHORIZATION_REQUEST,
  USER_AUTHORIZATION_SUCCESS,
  USER_AUTHORIZATION_ERROR,
  UPDATE_USER_DETAILS_REQUEST,
  UPDATE_USER_DETAILS_SUCCESS,
  UPDATE_USER_DETAILS_ERROR,
  USER_UNAUTHORIZATION_REQUEST,
  USER_UNAUTHORIZATION_SUCCESS,
  USER_UNAUTHORIZATION_ERROR,
} from '../action-types/user-details';

export const requestUserRegistration = () => ({
  type: USER_REGISTRATION_REQUEST
});

export const successUserRegistration = (data) => ({
  type: USER_REGISTRATION_SUCCESS,
  payload: data,
});

export const errorUserRegistration = (error) => ({
  type: USER_REGISTRATION_ERROR,
  error
});

export const requestUserAuthorization = () => ({
  type: USER_AUTHORIZATION_REQUEST
});

export const successUserAuthorization = (data) => ({
  type: USER_AUTHORIZATION_SUCCESS,
  payload: data,
});

export const errorUserAuthorization = (error) => ({
  type: USER_AUTHORIZATION_ERROR,
  error
});

export const requestUserUnauthorization = () => ({
  type: USER_UNAUTHORIZATION_REQUEST
});

export const successUserUnauthorization = () => ({
  type: USER_UNAUTHORIZATION_SUCCESS,
});

export const errorUserUnauthorization = (error) => ({
  type: USER_UNAUTHORIZATION_ERROR,
  error
});

export const requestUpdateUserDetails = () => ({
  type: UPDATE_USER_DETAILS_REQUEST
});

export const successUpdateUserDetails = (data) => ({
  type: UPDATE_USER_DETAILS_SUCCESS,
  payload: data,
});

export const errorUpdateUserDetails = (error) => ({
  type: UPDATE_USER_DETAILS_ERROR,
  error
});

export function registration({password, email, name}) {
  return function(dispatch) {
    dispatch(requestUserRegistration());
    const URL = `${API_URL}/auth/register`;
    const body = {
      'email': email,
      'password': password,
      'name': name,
    }

    return fetch(URL, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => {
        if (!response.ok) {
          dispatch(errorUserRegistration(`Response status: ${response.status}`));
        }

        return response.json()
      })
      .then((data) => {
          dispatch(successUserRegistration(data));
          localStorage.setItem("refreshToken", data.refreshToken);
          localStorage.setItem('accessToken', data.accessToken);

          return data;
      })
      .catch((error) => {
        dispatch(errorUserRegistration(error.message));
      });
    }
};

export function authorization({password, email}) {
  return function(dispatch) {
    dispatch(requestUserAuthorization());
    const URL = `${API_URL}/auth/login`;
    const body = {
      'email': email,
      'password': password,
    }

    return fetch(URL, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => {
        return checkReponse(response);
      })
      .then((data) => {
          dispatch(successUserAuthorization(data));
          localStorage.setItem("refreshToken", data.refreshToken);
          localStorage.setItem('accessToken', data.accessToken);

          return data;
      })
      .catch((error) => {
        dispatch(errorUserAuthorization(error.message));
      });
    }
};

export function unauthorization() {
  return function(dispatch) {
    dispatch(requestUserUnauthorization());
    const URL = `${API_URL}/auth/logout`;

    const body = {
      "token": localStorage.getItem('refreshToken')
  }

  return fetch(URL, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => {
        return checkReponse(response);
      })
      .then((data) => {
          dispatch(successUserUnauthorization());
          localStorage.removeItem('refreshToken');
          localStorage.removeItem('accessToken');
          return data;
      })
      .catch((error) => {
        dispatch(errorUserUnauthorization(error.message));
        return error;
      });
    }
};

export function refreshToken() {
  return function() {
    const URL = `${API_URL}/auth/token`;

    const body = {
      'token': localStorage.getItem('refreshToken')
    }

    return fetch(URL, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => {
        return checkReponse(response);
      })
      .then((data) => {
        localStorage.setItem("refreshToken", data.refreshToken);
        localStorage.setItem('accessToken', data.accessToken);
      }).catch((error) => {
        console.log(error);
      });
  }
};


export function resetPassword({password, token}) {
  return function() {
    const body = {
      "password": password,
      "token": token,
    }

    const URL = `${API_URL}/password-reset/reset`;

    return fetch(URL, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Response status: ${response.status} : ${response.statusText}`);
      }

      return response.json()
    })
    .then((data) => {
        return data;
    })
    .catch((error) => {
      console.log(error);
    });
  }
};

export function sendResetPasswordCode(email) {
  return function() {
    const body = {
      "email": email
    }

    const URL = `${API_URL}/password-reset`;

    return fetch(URL, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Response status: ${response.status} : ${response.statusText}`);
      }

      return response.json()
    })
    .then((data) => {
        return data;
    })
    .catch((e) => {
      console.log(e);
    });
  }
};

export const retriableFetch = (urlPath, options = {}) => {
  return function (dispatch) {
    const URL = `${API_URL}/${urlPath}`;

    fetch(URL, options)
    .then((response) => {
      return checkReponse(response);
    })
    .then((data) => {
      dispatch(successUpdateUserDetails(data));
    }).catch(async (error) => {
      dispatch(errorUpdateUserDetails(error.message));

      if (error.message === 'jwt expired' && error.success === false) {
        await dispatch(refreshToken());
        options = {
          ...options,
          headers: {
            ...options.headers,
            'Authorization': `${localStorage.getItem('accessToken')}`,
          },
        }
        fetch(URL, options)
          .then((response) => {
            return checkReponse(response);
          })
          .then((data) => {
            dispatch(successUpdateUserDetails(data));
          }).catch((error) => {
            dispatch(errorUpdateUserDetails(error.message));
          })
      } else {
        dispatch(errorUpdateUserDetails(error.message));
      }
      console.log(error.message);
    });
  }
};

const checkReponse = (response) => {
  return response.ok ? response.json() : response.json().then((error) => Promise.reject(error));
};
