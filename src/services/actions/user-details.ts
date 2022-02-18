import { API_URL } from '../../api/settings';
import {
  LoginRequestType,
  ResetPasswordRequestType,
  RegistrationRequestType,
  UserDetailsResponceType,
  UnauthorizationResponceType,
  AauthorizationResponceType,
  RefreshTokenResponceType,
} from '../../utils/types';
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
import { AppThunk, AppDispatch } from '../types/store'

export interface IRequestUserRegistration {
  readonly type: typeof USER_REGISTRATION_REQUEST;
}
export interface ISuccessUserRegistration {
  readonly type: typeof USER_REGISTRATION_SUCCESS;
  readonly payload: AauthorizationResponceType;
}
export interface IErrorUserRegistration {
  readonly type: typeof USER_REGISTRATION_ERROR;
  readonly error: string;
}
export interface IRequestUserAuthorization {
  readonly type: typeof USER_AUTHORIZATION_REQUEST;
}
export interface ISuccessUserAuthorization {
  readonly type: typeof USER_AUTHORIZATION_SUCCESS;
  readonly payload: AauthorizationResponceType;
}
export interface IErrorUserAuthorization {
  readonly type: typeof USER_AUTHORIZATION_ERROR;
  readonly error: string;
}
export interface IRequestUserUnauthorization {
  readonly type: typeof USER_UNAUTHORIZATION_REQUEST;
}
export interface ISuccessUserUnauthorization {
  readonly type: typeof USER_UNAUTHORIZATION_SUCCESS;
}
export interface IErrorUserUnauthorization {
  readonly type: typeof USER_UNAUTHORIZATION_ERROR;
  readonly error: string;
}
export interface IRequestUpdateUserDetails {
  readonly type: typeof UPDATE_USER_DETAILS_REQUEST;
}
export interface ISuccessUpdateUserDetails {
  readonly type: typeof UPDATE_USER_DETAILS_SUCCESS;
  readonly payload: UserDetailsResponceType;
}
export interface IErrorUpdateUserDetails {
  readonly type: typeof UPDATE_USER_DETAILS_ERROR;
  readonly error: string;
}

export type TUserDetailsActions =
  | IRequestUserRegistration
  | ISuccessUserRegistration
  | IErrorUserRegistration
  | IRequestUserAuthorization
  | ISuccessUserAuthorization
  | IErrorUserAuthorization
  | IRequestUserUnauthorization
  | ISuccessUserUnauthorization
  | IErrorUserUnauthorization
  | IRequestUpdateUserDetails
  | ISuccessUpdateUserDetails
  | IErrorUpdateUserDetails;

export const requestUserRegistration = (): IRequestUserRegistration => ({
  type: USER_REGISTRATION_REQUEST
});

export const successUserRegistration = (data: AauthorizationResponceType): ISuccessUserRegistration => ({
  type: USER_REGISTRATION_SUCCESS,
  payload: data,
});

export const errorUserRegistration = (error: string): IErrorUserRegistration => ({
  type: USER_REGISTRATION_ERROR,
  error
});

export const requestUserAuthorization = (): IRequestUserAuthorization => ({
  type: USER_AUTHORIZATION_REQUEST
});

export const successUserAuthorization = (data: AauthorizationResponceType): ISuccessUserAuthorization => ({
  type: USER_AUTHORIZATION_SUCCESS,
  payload: data,
});

export const errorUserAuthorization = (error: string): IErrorUserAuthorization => ({
  type: USER_AUTHORIZATION_ERROR,
  error
});

export const requestUserUnauthorization = (): IRequestUserUnauthorization => ({
  type: USER_UNAUTHORIZATION_REQUEST
});

export const successUserUnauthorization = (): ISuccessUserUnauthorization => ({
  type: USER_UNAUTHORIZATION_SUCCESS,
});

export const errorUserUnauthorization = (error: string): IErrorUserUnauthorization => ({
  type: USER_UNAUTHORIZATION_ERROR,
  error
});

export const requestUpdateUserDetails = (): IRequestUpdateUserDetails => ({
  type: UPDATE_USER_DETAILS_REQUEST
});

export const successUpdateUserDetails = (data: UserDetailsResponceType): ISuccessUpdateUserDetails => ({
  type: UPDATE_USER_DETAILS_SUCCESS,
  payload: data,
});

export const errorUpdateUserDetails = (error: string): IErrorUpdateUserDetails => ({
  type: UPDATE_USER_DETAILS_ERROR,
  error
});

export const registration: AppThunk = ({ password, email, name }: RegistrationRequestType) => (dispatch: AppDispatch) => {
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

      return response.json();
    })
    .then((data: AauthorizationResponceType) => {
      dispatch(successUserRegistration(data));
      localStorage.setItem("refreshToken", data.refreshToken);
      localStorage.setItem('accessToken', data.accessToken);

      return data;
    })
    .catch((error: { message: string }) => {
      dispatch(errorUserRegistration(error.message));
    });
};

export const authorization: AppThunk = ({ password, email }: LoginRequestType) => (dispatch: AppDispatch) => {
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
    .then((data: AauthorizationResponceType) => {
      dispatch(successUserAuthorization(data));
      localStorage.setItem("refreshToken", data.refreshToken);
      localStorage.setItem('accessToken', data.accessToken);

      return data;
    })
    .catch((error: { message: string }) => {
      dispatch(errorUserAuthorization(error.message));
    });
};

export const unauthorization: AppThunk = () => (dispatch: AppDispatch) => {
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
    .then((data: UnauthorizationResponceType) => {
      dispatch(successUserUnauthorization());
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('accessToken');

      return data;
    })
    .catch((error: { message: string }) => {
      dispatch(errorUserUnauthorization(error.message));
      return error;
    });

};

export const refreshToken: AppThunk = () => () => {
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
    .then((data: RefreshTokenResponceType) => {
      localStorage.setItem("refreshToken", data.refreshToken);
      localStorage.setItem('accessToken', data.accessToken);
    }).catch((error: { message: string }) => {
      console.log(error.message);
    });
};

export const resetPassword: AppThunk = ({ password, token }: ResetPasswordRequestType) => () => {
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
    .then((data: UnauthorizationResponceType) => {
      return data;
    })
    .catch((error: { message: string }) => {
      console.log(error.message);
    });
};

export const sendResetPasswordCode: AppThunk = (email: string) => () => {
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
    .then((data: UnauthorizationResponceType) => {
      return data;
    })
    .catch((error: { message: string }) => {
      console.log(error.message);
    });

};

export const retriableFetch : AppThunk = (urlPath: string, options: { method: string, headers: {} }) => (dispatch: AppDispatch) => {
  const URL = `${API_URL}/${urlPath}`;

  fetch(URL, options)
    .then((response) => {
      return checkReponse(response);
    })
    .then((data) => {
      dispatch(successUpdateUserDetails(data));
    }).catch(async (error: { message: string, success: boolean }) => {
      dispatch(errorUpdateUserDetails(error.message));

      if (error.message === 'jwt expired' && error.success === false) {
        // TODO
        await refreshToken();
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
          }).catch((error: { message: string }) => {
            dispatch(errorUpdateUserDetails(error.message));
          })
      } else {
        dispatch(errorUpdateUserDetails(error.message));
      }

      console.log(error.message);
    });
};

const checkReponse = (response: Response) => {
  return response.ok ? response.json() : response.json().then((error) => Promise.reject(error.message));
};
