import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import registrationStyles from './register.module.css';
import { Button, Input, EmailInput, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { generateRoutePath, RouteName } from '../../routes/helper';
import { registration } from '../../services/actions/user-details';

export function RegistrationPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const initialState = { email: '', password: '', name: '' };
  const [form, setValue] = useState(initialState);
  const title = 'Регистрация';

  const onChange = (event) => {
    const { name, value } = event.target;
    setValue({ ...form, [name]: value });
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    const formData = {password: form.password, email: form.email, name: form.name}
    const response = await dispatch(registration(formData));

    if(response?.success) {
      setValue(initialState);
      navigate(generateRoutePath({name: RouteName.login}));
    }
  };

  return (
    <section className={registrationStyles.container}>
      <form className={registrationStyles.form} onSubmit={onSubmit}>
        <p className={`${registrationStyles.heading} text text_type_main-medium`}>{title}</p>
        <div className={registrationStyles.input}>
          <Input  type='text' placeholder='Имя' value={form.name} name='name' onChange={onChange} />
        </div>
        <div className={registrationStyles.input}>
          <EmailInput value={form.email} name='email' onChange={onChange} />
        </div>
        <div className={registrationStyles.input}>
          <PasswordInput value={form.password} name='password' onChange={onChange} />
        </div>
        <span className={registrationStyles.button}>
          <Button type="primary" size="medium">
            <p className="text text_type_main-default">Зарегистрироваться</p>
          </Button>
        </span>
      </form>
      <div className={registrationStyles.actions}>
        <div className={registrationStyles.action}>
          <p className="text text_type_main-default text_color_inactive">Уже зарегистрированы?</p>
          &nbsp;
          <Link
            to={generateRoutePath({name: RouteName.login})}
            className={`${registrationStyles.link} text text_type_main-default`}
          >Войти</Link>
        </div>
      </div>
    </section>
  );
}
