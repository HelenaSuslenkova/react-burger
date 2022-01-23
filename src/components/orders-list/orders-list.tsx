import { useMemo, useEffect, FC } from "react";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ordersListStyles from "./orders-list.module.css";
import { OrdersListResponceType } from "../../utils/types";
import { useSelector, useDispatch } from "../../services/types/hooks";
import burgerIngredientsSelector from "../../services/selectors/burger-ingredients";
import { BurgerIngredientType } from "../../utils/types";
import { wsSelector } from "../../services/selectors/ws";
import { wsConnectionStart } from '../../services/actions/ws';

type OrdersListProps = {
  headerTitle?: string;
};

export const OrdersList: FC<OrdersListProps> = ({
  headerTitle = "",
  children,
}): JSX.Element => {
  // const data: OrdersListResponceType =
  // {
  //   "success": true,
  //   "orders": [
  //     {
  //       "ingredients": [
  //         "60d3b41abdacab0026a733c7",
  //         "60d3b41abdacab0026a733c8",
  //         "60d3b41abdacab0026a733c9",
  //       ],
  //       "_id": "",
  //       "status": "done",
  //       "number": 0,
  //       "createdAt": "2021-06-23T14:43:22.587Z",
  //       "updatedAt": "2021-06-23T14:43:22.603Z"
  //     },
  //     {
  //       "ingredients": [
  //         "60d3b41abdacab0026a733c6",
  //         "60d3b41abdacab0026a733cc",
  //         "60d3b41abdacab0026a733c8",
  //       ],
  //       "_id": "",
  //       "status": "done",
  //       "number": 0,
  //       "createdAt": "2021-06-23T14:43:22.587Z",
  //       "updatedAt": "2021-06-23T14:43:22.603Z"
  //     }
  //   ],
  //   "total": 2,
  //   "totalToday": 2

  // };

  // const burgerIngredients = useSelector(burgerIngredientsSelector.data);

  // const ordersIngredients = useMemo(() => {
  //   return data?.orders?.reduce((result: any, { ingredients }, key): any => {
  //     result[key] = ingredients;
  //     return result;
  //   }, [])
  // }, [data]);

  //console.log(ordersIngredients);

  // const orders = useMemo(() => {
  //   return ordersIngredients.reduce((result: any, orderIds: Array<string>, index: number) => {
  //     const resultInner = orderIds.reduce((acc: any, orderId) => {
  //       const key = burgerIngredients?.findIndex((ingredient) => ingredient._id === orderId);
  //       if (key !== -1) {
  //         acc?.push(burgerIngredients[key]);
  //       }
  //       return acc;
  //     }, [])
  //     result[index] = resultInner;
  //     return result;
  //   }, [[]])
  // }, [burgerIngredients]);

  // console.log(orders);

  const dispatch = useDispatch();
  const isConnected = useSelector(wsSelector.wsIsConnected);
  const error = useSelector(wsSelector.wsError);
  const feed = useSelector(wsSelector.wsData);

  if (isConnected && feed !== null) {
    console.log({ feed });
  }

  useEffect(
    () => {
     // if (user) {
        dispatch(wsConnectionStart());
     // }
    },
    []
  );
  return (
    <div className={ordersListStyles.body}>
      {headerTitle && (
        <p className={`${ordersListStyles.header} text text_type_main-large`}>
          {headerTitle}
        </p>
      )}
      <div className={ordersListStyles.container}>{children}</div>
    </div>
  );
};
