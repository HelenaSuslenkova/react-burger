import { ChangeEventHandler, FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import resetPasswordStyles from './reset-password.module.css';
import { Button, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { generateRoutePath, RouteName } from '../../routes/helper';
import { resetPassword } from '../../services/actions/user-details';
import { ResetPasswordRequestType } from '../../utils/types';

export const ResetPasswordPage = (): JSX.Element => {
  const title = 'Восстановить пароль';
  const initialState = { password: '', token: '' };
  const [form, setValue] = useState<ResetPasswordRequestType>(initialState);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    const { name, value } = event.target;
    setValue({ ...form, [name]: value });
  };

  const onSubmit = async(event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = {password: form.password, token: form.token};
    const response: any = await dispatch(resetPassword(formData));
    if(response?.success) {
      setValue(initialState);
      navigate(generateRoutePath({name: RouteName.login}));
    }
  };

  return (
    <section className={resetPasswordStyles.container}>
      <form className={resetPasswordStyles.form} onSubmit={onSubmit}>
        <p className={`${resetPasswordStyles.heading} text text_type_main-medium`}>{title}</p>
        <div className={resetPasswordStyles.input}>
          <PasswordInput value={form.password} name='password' onChange={onChange} />
        </div>
        <div className={resetPasswordStyles.input}>
          <Input type='text' placeholder='Введите код из письма' value={form.token} name='token' onChange={onChange} />
        </div>
        <span className={resetPasswordStyles.button}>
          <Button type="primary" size="medium">
            <p className="text text_type_main-default">Сохранить</p>
          </Button>
        </span>
      </form>
      <div className={resetPasswordStyles.actions}>
        <div className={resetPasswordStyles.action}>
          <p className="text text_type_main-default text_color_inactive">Вспомнили пароль?</p>
          &nbsp;
          <Link
            to={generateRoutePath({name: RouteName.login})}
            className={`${resetPasswordStyles.link} text text_type_main-default`}
          >Войти</Link>
        </div>
      </div>
    </section>
  );
}
