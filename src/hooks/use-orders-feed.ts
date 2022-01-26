import { useMemo } from "react";
import { useSelector } from "../services/types/hooks";
import { wsSelector } from "../services/selectors/ws";
import burgerIngredientsSelector from "../services/selectors/burger-ingredients";
import {
  BurgerIngredientType,
  OrderInfo,
  OrderData,
  FeedOrders,
 //  FeedOrdersIngredients,
 } from "../utils/types";
 import { TABS_TYPES } from '../utils/const';

function useOrdersFeed(): [ordersData: OrderData[], isNotOrdersEmpty: boolean] {
  const { orders } = useSelector(wsSelector.wsData);
  const burgerIngredients = useSelector(burgerIngredientsSelector.data);

  const isNotOrdersEmpty = Boolean(orders?.length);

  const hasBunId = (ingredients: BurgerIngredientType[], id: string) : boolean => (
    Boolean(ingredients?.find((ingredient) =>
      ingredient._id === id && ingredient.type === TABS_TYPES.bun),
  ));

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

   return [ordersData, isNotOrdersEmpty];
}

export default useOrdersFeed;
