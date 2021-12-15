export const burgerConstructorSummarySelector = {
  orderDetails: {
    data: (state: any) => state.burgerConstructorSummary.orderDetails.data,
    error: (state: any) => state.burgerConstructorSummary.orderDetails.error,
    orderDetailsRequest: (state: any) => state.burgerConstructorSummary.orderDetails.orderDetailsRequest,
    orderDetailsError: (state: any) => state.burgerConstructorSummary.orderDetails.orderDetailsError,
  }
}

export default burgerConstructorSummarySelector;
