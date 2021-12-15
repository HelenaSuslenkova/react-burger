import { useState, useEffect, FormEvent, ChangeEventHandler, SyntheticEvent } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import userProfileStyles from './user-profile.module.css';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { userDetailsSelector } from '../../services/selectors/userDetails';
import { TextInput } from '../../components/text-input/text-input';
import { retriableFetch } from '../../services/actions/user-details';

export const UserProfilePage = (): JSX.Element => {
  const dispatch = useDispatch();
  const { name, email } = useSelector(userDetailsSelector.useDetails);
  const initialFormValues = { login: email, password: '', name: name };
  const [form, setFormValue] = useState<{login: string, password: string, name: string}>(initialFormValues);
  const [isShowButtons, setIsShowButtons] = useState<boolean>(false);

  const onChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    const { name, value } = event.target;
    setFormValue({ ...form, [name]: value });
    setIsShowButtons(true);
  };

  useEffect(() => {
    setFormValue({ login: email, password: '', name: name })
  }, [name, email])

  const resetForm = (event: SyntheticEvent) => {
    event.preventDefault();
    setFormValue(initialFormValues);
    setIsShowButtons(false);
  }

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    updateUser();
    setIsShowButtons(false);
  }

  const updateUser = () => {
      const urlPath = `auth/user`;
      const options ={
        method: 'PATCH',
        body: JSON.stringify(form),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${localStorage.getItem('accessToken')}`,
        },
      }
      dispatch(retriableFetch(
        urlPath,
        options
      ));
  };

  return (
    <form className={userProfileStyles.form} onSubmit={onSubmit}>
      <div className={userProfileStyles.input}>
        <TextInput
          placeholder='Имя'
          icon={'EditIcon'}
          name='name'
          value={form.name}
          onChange={onChange}
        />
      </div>
      <div className={userProfileStyles.input}>
        <TextInput
          placeholder='Логин'
          icon={'EditIcon'}
          name='login'
          value={form.login}
          onChange={onChange}
          />
      </div>
      <div className={userProfileStyles.input}>
        <TextInput
          placeholder='Пароль'
          icon={'EditIcon'}
          name='password'
          value={form.password}
          onChange={onChange}
        />
      </div>
      {isShowButtons && <span className={userProfileStyles.button}>
        <Button htmlType="reset" size="small" onClick={resetForm}>
          <p className="text text_type_main-default">Отмена</p>
        </Button>
        <Button htmlType="submit" size="small" >
          <p className="text text_type_main-default">Сохранить</p>
        </Button>
      </span>}
    </form>
  );
}
