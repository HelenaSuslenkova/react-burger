import { RootState } from '../../services/types/store';

export const burgerConstructorElementsSelector = {
  mainBun: (state: RootState) => state.burgerConstructorElements.mainBun,
  elements: (state: RootState) => state.burgerConstructorElements.elements,
}

export default burgerConstructorElementsSelector;
