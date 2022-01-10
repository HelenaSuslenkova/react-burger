import ordersSummaryStyles from "./orders-summary.module.css";

export const OrdersSummary = (): JSX.Element => {

  return (
    <div className={ordersSummaryStyles.container}>
      <div className={ordersSummaryStyles.statuses}>
        <div className={ordersSummaryStyles.status}>
          <p className={`${ordersSummaryStyles.header} text text_type_main-medium`}>Готовы:</p>
          <div className={ordersSummaryStyles.prepared}>
            <p className={`${ordersSummaryStyles.orderId} text text_type_digits-default`}>034533</p>
            <p className={`${ordersSummaryStyles.orderId} text text_type_digits-default`}>034533</p>
            <p className={`${ordersSummaryStyles.orderId} text text_type_digits-default`}>034533</p>
            <p className={`${ordersSummaryStyles.orderId} text text_type_digits-default`}>034533</p>
          </div>
        </div>
        <div className={ordersSummaryStyles.status}>
          <p className={`${ordersSummaryStyles.header} text text_type_main-medium`}>В работе:</p>
          <div>
            <p className={`${ordersSummaryStyles.orderId} text text_type_digits-default`}>034533</p>
            <p className={`${ordersSummaryStyles.orderId} text text_type_digits-default`}>034533</p>
            <p className={`${ordersSummaryStyles.orderId} text text_type_digits-default`}>034533</p>
          </div>
        </div>
      </div>
      <div className={ordersSummaryStyles.total}>
        <p className='text text_type_main-medium'>Выполнено за все время:</p>
        <p className='text text_type_digits-large'>28752</p>
      </div>
      <div className={ordersSummaryStyles.total}>
        <p className='text text_type_main-medium'>Выполнено за сегодня:</p>
        <p className='text text_type_digits-large'>138</p>
      </div>
    </div>
  );
}
