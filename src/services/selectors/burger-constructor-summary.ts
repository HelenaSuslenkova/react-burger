import { RootState } from '../../services/types/store';

export const burgerConstructorSummarySelector = {
  orderDetails: {
    data: (state: RootState) => state.burgerConstructorSummary.orderDetails.data,
    error: (state: RootState) => state.burgerConstructorSummary.orderDetails.error,
    orderDetailsRequest: (state: RootState) => state.burgerConstructorSummary.orderDetails.orderDetailsRequest,
    orderDetailsError: (state: RootState) => state.burgerConstructorSummary.orderDetails.orderDetailsError,
  }
}

export default burgerConstructorSummarySelector;
