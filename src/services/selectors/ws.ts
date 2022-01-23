import { RootState } from '../../services/types/store';

export const wsSelector = {
  wsData: (state: RootState) => state.feedOrders.data,
  wsIsConnected: (state: RootState) => state.feedOrders.isConnected,
  wsError: (state: RootState) => state.feedOrders.error,
}
