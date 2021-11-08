export const burgerConstructorSummarySelector = {
  orderDetails: {
    data: (state) => state.burgerConstructorSummary.orderDetails.data,
    error: (state) => state.burgerConstructorSummary.orderDetails.error,
    orderDetailsRequest: (state) => state.burgerConstructorSummary.orderDetails.orderDetailsRequest,
    orderDetailsError: (state) => state.burgerConstructorSummary.orderDetails.orderDetailsError,
  }
}

export default burgerConstructorSummarySelector;
