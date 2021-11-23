export const userDetailsSelector = {
  email: (state) => state.userDetails.email,
  name: (state) => state.userDetails.name,
  useDetails: (state) => ({
    name: state.userDetails.name,
    email: state.userDetails.email,
  }),
  isUserDetails: (state) => state.userDetails.email && state.userDetails.name,
  error: (state) => state.userDetails.error,
  userAuthRequest: (state) => state.userDetails.userAuthRequest,
  userAuthError: (state) => state.userDetails.userAuthError,
}
