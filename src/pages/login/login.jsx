import { useState} from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import loginStyles from './login.module.css';
import { Button, EmailInput, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { generateRoutePath, RouteName } from '../../routes/helper';
import { authorization } from '../../services/actions/user-details';

export function LoginPage() {
  const dispatch = useDispatch();
  const {state} = useLocation();
  const navigate = useNavigate();

  const title = 'Вход';
  const initialState = { email: '', password: '' };
  const [form, setValue] = useState(initialState);

  const onChange = (event) => {
    const { name, value } = event.target;
    setValue({ ...form, [name]: value });
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    const formData = {password: form.password, email: form.email}
    const response = await dispatch(authorization(formData));

    if(response?.success) {
      setValue(initialState);
      navigate(state?.pathname || '/', { replace: true })
    }
  };

  return (
    <section className={loginStyles.container}>
      <form className={loginStyles.form} onSubmit={onSubmit}>
        <p className={`${loginStyles.heading} text text_type_main-medium`}>{title}</p>
        <div className={loginStyles.input}>
          <EmailInput value={form.email} name='email' onChange={onChange} />
        </div>
        <div className={loginStyles.input}>
          <PasswordInput value={form.password} name='password' onChange={onChange} />
        </div>
        <span className={loginStyles.button}>
          <Button type="primary" size="medium">
            <p className="text text_type_main-default">Войти</p>
          </Button>
        </span>
      </form>
      <div className={loginStyles.actions}>
        <div className={loginStyles.action}>
          <p className="text text_type_main-default text_color_inactive">Вы — новый пользователь?</p>
          &nbsp;
          <Link
            to={generateRoutePath({name: RouteName.register})}
            className={`${loginStyles.link} text text_type_main-default`}
          >Зарегистрироваться</Link>
        </div>
        <div className={loginStyles.action}>
          <p className="text text_type_main-default text_color_inactive">Забыли пароль?</p>
          &nbsp;
          <Link
            to={generateRoutePath({name: RouteName.forgotPassword})}
            className={`${loginStyles.link} text text_type_main-default`}
          >Восстановить пароль</Link>
        </div>
      </div>
    </section>
  );
}
