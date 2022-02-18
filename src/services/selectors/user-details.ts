import { RootState } from '../types/store';

export const userDetailsSelector = {
  email: (state: RootState) => state.userDetails.email,
  name: (state: RootState) => state.userDetails.name,
  useDetails: (state: RootState) => ({
    name: state.userDetails.name,
    email: state.userDetails.email,
  }),
  isUserDetails: (state: RootState) => state.userDetails.email && state.userDetails.name,
  error: (state: RootState) => state.userDetails.error,
  userDetailsRequest: (state: RootState) => state.userDetails.userDetailsRequest,
  userDetailsError: (state: RootState) => state.userDetails.userDetailsError,
}
