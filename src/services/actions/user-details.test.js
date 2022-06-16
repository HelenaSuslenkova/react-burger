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
  registration,
  authorization,
  unauthorization,
  refreshToken,
  resetPassword,
  sendResetPasswordCode,
  retriableFetch,
} from "./user-details";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const mockAuthorizationResponse = {
  user: {
    email: "test@mail.by",
    name: "test",
  },
  accessToken: "testAccessToken",
  refreshToken: "testRefreshToken",
  success: true,
  message: "test",
};
const mockUserDetailsResponse = {
  user: {
    email: "test@mail.by",
    name: "test",
  },
  success: true,
  message: "test",
};

const mockUnauthorizationResponse = {
  success: true,
  message: "test",
};

const mockRefreshTokenResponse = {
  accessToken: "testAccessToken",
  refreshToken: "testRefreshToken",
};

describe.skip("User details actions", () => {
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
        payload: mockUserDetailsResponse,
      });
    });
  });

  describe("Authorization thunks", () => {
    beforeEach(() => {
      jest.spyOn(global, "fetch").mockResolvedValue({
        json: jest.fn().mockResolvedValue(mockAuthorizationResponse),
        ok: true,
      });
    });

    it("fetches registration", () => {
      const expectedActions = [
        requestUserRegistration(),
        successUserRegistration(mockAuthorizationResponse),
      ];

      const store = mockStore({});

      const requestData = {
        password: "password",
        email: "test@email.by",
        name: "test",
      };

      return expect(
        store.dispatch(registration(requestData)).then(() => store.getActions())
      ).resolves.toEqual(expectedActions);
    });

    it("fetches authorization", () => {
      const expectedActions = [
        requestUserAuthorization(),
        successUserAuthorization(mockAuthorizationResponse),
      ];

      const store = mockStore({});

      const requestData = {
        password: "password",
        email: "test@email.by",
      };

      return expect(
        store
          .dispatch(authorization(requestData))
          .then(() => store.getActions())
      ).resolves.toEqual(expectedActions);
    });
  });

  describe("Unauthorization thunk", () => {
    beforeEach(() => {
      jest.spyOn(global, "fetch").mockResolvedValue({
        json: jest.fn().mockResolvedValue(mockUnauthorizationResponse),
        ok: true,
      });
    });

    it("fetches unauthorization", () => {
      const expectedActions = [
        requestUserUnauthorization(),
        successUserUnauthorization(),
      ];

      const store = mockStore({});

      return expect(
        store.dispatch(unauthorization()).then(() => store.getActions())
      ).resolves.toEqual(expectedActions);
    });
  });

  describe("Refresh token thunk", () => {
    beforeEach(() => {
      jest.spyOn(global, "fetch").mockResolvedValue({
        json: jest.fn().mockResolvedValue(mockRefreshTokenResponse),
        ok: true,
      });
    });

    it("fetches refresh token", () => {
      const store = mockStore({});

      return expect(
        store.dispatch(refreshToken()).then((data) => data)
      ).resolves.toEqual(mockRefreshTokenResponse);
    });
  });

  describe("Reset Password thunk", () => {
    beforeEach(() => {
      jest.spyOn(global, "fetch").mockResolvedValue({
        json: jest.fn().mockResolvedValue(mockUnauthorizationResponse),
        ok: true,
      });
    });

    it("fetches reset password", () => {
      const store = mockStore({});

      const requestData = {
        password: "password",
        token: "testToken",
      };

      return expect(
        store.dispatch(resetPassword(requestData)).then((data) => data)
      ).resolves.toEqual(mockUnauthorizationResponse);
    });
  });

  describe("Send Reset Password Code thunk", () => {
    beforeEach(() => {
      jest.spyOn(global, "fetch").mockResolvedValue({
        json: jest.fn().mockResolvedValue(mockUnauthorizationResponse),
        ok: true,
      });
    });

    it("fetches reset password", () => {
      const store = mockStore({});

      const requestData = {
        email: "test@email.by",
      };

      return expect(
        store.dispatch(sendResetPasswordCode(requestData)).then((data) => data)
      ).resolves.toEqual(mockUnauthorizationResponse);
    });
  });

  describe("Retriable Update User thunk", () => {
    beforeEach(() => {
      jest.spyOn(global, "fetch").mockResolvedValue({
        json: jest.fn().mockResolvedValue(mockUserDetailsResponse),
        ok: true,
      });
    });

    it("fetches retriable update user", () => {
      const store = mockStore({});

      const urlPath = `test`;
      const options = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `accessToken`,
        },
      };

      const expectedActions = [
        requestUpdateUserDetails(),
        successUpdateUserDetails(mockUserDetailsResponse),
      ];

      return expect(
        store
          .dispatch(retriableFetch(urlPath, options))
          .then(() => store.getActions())
      ).resolves.toEqual(expectedActions);
    });
  });
});
