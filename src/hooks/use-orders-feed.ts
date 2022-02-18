import { useMemo } from "react";
import { useSelector } from "../services/types/hooks";
import { wsSelector } from "../services/selectors/ws";
import burgerIngredientsSelector from "../services/selectors/burger-ingredients";
import {
  BurgerIngredientType,
  OrderData,
} from "../utils/types";
import { TABS_TYPES, ORDER_STATUS } from "../utils/const";

function useOrdersFeed(
  orderId?: string
): {
  ordersData: OrderData[],
  isNotOrdersEmpty: boolean,
  currentOrder: OrderData | null,
  currentOrderPrice: number | undefined,
  formattedDate: string,
} {
  const { orders } = useSelector(wsSelector.wsData);
  const burgerIngredients = useSelector(burgerIngredientsSelector.data);

  const isNotOrdersEmpty = Boolean(orders?.length);

  const hasBunId = (ingredients: BurgerIngredientType[], id: string): boolean =>
    Boolean(
      ingredients?.find(
        (ingredient) =>
          ingredient._id === id && ingredient.type === TABS_TYPES.bun
      )
    );

  const ordersData = useMemo(() => {
    return orders?.reduce(
      (result: OrderData[], { ingredients, ...rest }: any, index: number) => {
        const resultInner = ingredients?.reduce(
          (acc: OrderData, ingredientId: string) => {
            const key = burgerIngredients?.findIndex(
              (ingredient) => ingredient._id === ingredientId
            );
            if (key !== -1 && !hasBunId(acc.ingredients, ingredientId)) {
              acc.ingredients.push(burgerIngredients[key]);
              acc.orderData = rest;
            }
            return acc;
          },
          { ingredients: [], orderData: {} }
        );
        result[index] = resultInner;
        return result || [];
      },
      []
    );
  }, [burgerIngredients, orders]);

  const currentOrder = useMemo(() => {
    let current = null;
    if (Boolean(ordersData.length) && orderId) {
      current = ordersData.filter(
        ({ orderData }) => orderData._id === orderId
      )[0];
    }
    return current;
  }, [ordersData, orderId]);

  const currentOrderPrice = useMemo(() => {
    return currentOrder?.ingredients?.reduce(
      (sum, ingredient) =>
        ingredient.type === TABS_TYPES.bun
          ? sum + ingredient.price * 2
          : sum + ingredient.price,
      0
    );
  }, [currentOrder?.ingredients]);

  const currentOrderDate = currentOrder?.orderData?.status === ORDER_STATUS.done ? currentOrder?.orderData?.updatedAt : currentOrder?.orderData?.createdAt;

  const formattedDate: string = useMemo(() => {
    let formattedDate = ''
    if (currentOrderDate) {
      const date =  new Date(currentOrderDate);
      const month = date.toLocaleString("default", { month: "long" });
      formattedDate = `${month}/${date.getUTCDate()}/${date.getUTCFullYear()} ${date.getUTCHours()}:${date.getUTCMinutes()}`;
    }
    return formattedDate;
    }, [currentOrderDate]);

  return {
    ordersData,
    isNotOrdersEmpty,
    currentOrder,
    currentOrderPrice,
    formattedDate,
  };
}

export default useOrdersFeed;
