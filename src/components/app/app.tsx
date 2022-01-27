import { BrowserRouter as Router } from 'react-router-dom';
import { Routes } from '../../routes/routes';
import { AppHeader } from '../app-header/app-header';
import { useEffect } from 'react';
import { useDispatch } from '../../services/types/hooks';
import { getBurgerIngredients } from '../../services/actions/burger-ingredients';

export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBurgerIngredients());
  }, []);

  return(
    <Router>
      <AppHeader />
      <Routes />
    </Router>
  );
};
