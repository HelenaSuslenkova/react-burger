import { useState, ChangeEventHandler, FormEvent } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "../../services/types/hooks";
import forgotPasswordStyles from "./forgot-password.module.css";
import {
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { generateRoutePath, RouteName } from "../../routes/helper";
import { sendResetPasswordCode } from "../../services/actions/user-details";
import { ForgotPasswordRequestType } from "../../utils/types";

export const ForgotPasswordPage = (): JSX.Element => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const dispatch = useDispatch();

  const initialState = { email: "" };
  const [form, setValue] = useState<ForgotPasswordRequestType>(initialState);
  const title = "Восстановление пароля";

  const onChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    const { name, value } = event.target;
    setValue({ ...form, [name]: value });
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await dispatch(sendResetPasswordCode(form.email));
    setValue(initialState);
    navigate(generateRoutePath({ name: RouteName.resetPassword }), {
      state: {
        path: pathname,
      },
    });
  };

  return (
    <section className={forgotPasswordStyles.container}>
      <form className={forgotPasswordStyles.form} onSubmit={onSubmit}>
        <p
          className={`${forgotPasswordStyles.heading} text text_type_main-medium`}
        >
          {title}
        </p>
        <div className={forgotPasswordStyles.input}>
          <Input
            placeholder="Укажите e-mail"
            value={form.email}
            name="email"
            onChange={onChange}
          />
        </div>
        <span className={forgotPasswordStyles.button}>
          <Button type="primary" size="medium">
            <p className="text text_type_main-default">Восстановить</p>
          </Button>
        </span>
      </form>
      <div className={forgotPasswordStyles.actions}>
        <div className={forgotPasswordStyles.action}>
          <p className="text text_type_main-default text_color_inactive">
            Вспомнили пароль?
          </p>
          &nbsp;
          <Link
            to={generateRoutePath({ name: RouteName.login })}
            className={`${forgotPasswordStyles.link} text text_type_main-default`}
          >
            Войти
          </Link>
        </div>
      </div>
    </section>
  );
};
