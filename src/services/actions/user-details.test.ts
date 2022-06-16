import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";

import {
  USER_REGISTRATION_REQUEST,
  USER_REGISTRATION_SUCCESS,
  USER_REGISTRATION_ERROR,

  USER_AUTHORIZATION_REQUEST,
  USER_AUTHORIZATION_SUCCESS,
  USER_AUTHORIZATION_ERROR,

  USER_UNAUTHORIZATION_REQUEST,
  USER_UNAUTHORIZATION_SUCCESS,
  USER_UNAUTHORIZATION_ERROR,

  UPDATE_USER_DETAILS_REQUEST,
  UPDATE_USER_DETAILS_SUCCESS,
  UPDATE_USER_DETAILS_ERROR,
} from "../action-types/user-details";
import {
  requestUserRegistration,
  successUserRegistration,
  errorUserRegistration,

  requestUserAuthorization,
  successUserAuthorization,
  errorUserAuthorization,

  requestUserUnauthorization,
  successUserUnauthorization,
  errorUserUnauthorization,

  requestUpdateUserDetails,
  successUpdateUserDetails,
  errorUpdateUserDetails,
} from "./user-details";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);


const mockAuthorizationResponse = {
  user: {
    email: 'test@mail.by',
    name: 'test',
  },
  accessToken: 'testAccessToken',
  refreshToken: 'testRefreshToken',
  success: true,
  message: 'test',
}
const mockUserDetailsResponse = {
  user: {
    email: 'test@mail.by',
    name: 'test',
  },
  success: true,
  message: 'test',
};

describe("User details actions", () => {
  describe("User registration actions creators", () => {
    it("creates request action correctly", () => {
      expect(requestUserRegistration()).toEqual({
        type: USER_REGISTRATION_REQUEST,
      });
    });

    it("creates error action correctly", () => {
      expect(errorUserRegistration("test error message")).toEqual({
        type: USER_REGISTRATION_ERROR,
        error: "test error message",
      });
    });

    it("creates success action correctly", () => {
      expect(successUserRegistration(mockAuthorizationResponse)).toEqual({
        type: USER_REGISTRATION_SUCCESS,
        payload: mockAuthorizationResponse,
      });
    });
  });

  describe("User authorization actions creators", () => {
    it("creates request action correctly", () => {
      expect(requestUserAuthorization()).toEqual({
        type: USER_AUTHORIZATION_REQUEST,
      });
    });

    it("creates error action correctly", () => {
      expect(errorUserAuthorization("test error message")).toEqual({
        type: USER_AUTHORIZATION_ERROR,
        error: "test error message",
      });
    });

    it("creates success action correctly", () => {
      expect(successUserAuthorization(mockAuthorizationResponse)).toEqual({
        type: USER_AUTHORIZATION_SUCCESS,
        payload: mockAuthorizationResponse,
      });
    });
  });

  describe("User unauthorization actions creators", () => {
    it("creates request action correctly", () => {
      expect(requestUserUnauthorization()).toEqual({
        type: USER_UNAUTHORIZATION_REQUEST,
      });
    });

    it("creates error action correctly", () => {
      expect(errorUserUnauthorization("test error message")).toEqual({
        type: USER_UNAUTHORIZATION_ERROR,
        error: "test error message",
      });
    });

    it("creates success action correctly", () => {
      expect(successUserUnauthorization()).toEqual({
        type: USER_UNAUTHORIZATION_SUCCESS,
      });
    });
  });

  describe("Update user details actions creators", () => {
    it("creates request action correctly", () => {
      expect(requestUpdateUserDetails()).toEqual({
        type: UPDATE_USER_DETAILS_REQUEST,
      });
    });

    it("creates error action correctly", () => {
      expect(errorUpdateUserDetails("test error message")).toEqual({
        type: UPDATE_USER_DETAILS_ERROR,
        error: "test error message",
      });
    });

    it("creates success action correctly", () => {
      expect(successUpdateUserDetails(mockUserDetailsResponse)).toEqual({
        type: UPDATE_USER_DETAILS_SUCCESS,
        payload: mockUserDetailsResponse
      });
    });
  });
});
