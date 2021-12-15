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

const initialState = {
  email: '',
  name: '',
  userDetailsRequest: false,
  userDetailsError: false,
  error: null,
};

export const userDetailsReducer = (state = initialState, action: any) => {
  switch(action.type) {
    case USER_REGISTRATION_REQUEST:
    case USER_AUTHORIZATION_REQUEST:
    case USER_UNAUTHORIZATION_REQUEST:
    case UPDATE_USER_DETAILS_REQUEST:
    {
      return {
        ...state,
        userDetailsRequest: true,
      }
    }
    case USER_REGISTRATION_SUCCESS:
    case USER_AUTHORIZATION_SUCCESS:
    case UPDATE_USER_DETAILS_SUCCESS:
    {
      return {
        ...state,
        email: action.payload.user.email,
        name: action.payload.user.name,
        userDetailsRequest: false,
        error: initialState.error,
      }
    }
    case USER_REGISTRATION_ERROR:
    case USER_AUTHORIZATION_ERROR:
    case UPDATE_USER_DETAILS_ERROR:
    case USER_UNAUTHORIZATION_ERROR:
    {
      return {
        ...state,
        userDetailsRequest: false,
        userDetailsError: true,
        error: action.error,
      }
    }
    case USER_UNAUTHORIZATION_SUCCESS:
    {
      return {
        ...state,
        email: initialState.email,
        name: initialState.name,
        error: initialState.error,
        userDetailsRequest: false,
      }
    }
    default: {
      return state;
    }
  }
}
