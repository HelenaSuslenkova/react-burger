import { Link } from 'react-router-dom';
import { generateRoutePath, RouteName } from '../../routes/helper';
import notFoundPageStyle from './page404.module.css';

export function Page404() {
  return (
      <div className={notFoundPageStyle.container}>
        <p className="text text_type_main-medium">Страница не найдена. Ошибка 404.</p>
        <Link
        to={generateRoutePath({name: RouteName.main})}
        className={`${notFoundPageStyle.link} text text_type_main-default`}
        >Перейти на главную
        </Link>
      </div>
  );
}
