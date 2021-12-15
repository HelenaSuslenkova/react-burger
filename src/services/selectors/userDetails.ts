export const userDetailsSelector = {
  email: (state: any) => state.userDetails.email,
  name: (state: any) => state.userDetails.name,
  useDetails: (state: any) => ({
    name: state.userDetails.name,
    email: state.userDetails.email,
  }),
  isUserDetails: (state: any) => state.userDetails.email && state.userDetails.name,
  error: (state: any) => state.userDetails.error,
  userAuthRequest: (state: any) => state.userDetails.userAuthRequest,
  userAuthError: (state: any) => state.userDetails.userAuthError,
}
