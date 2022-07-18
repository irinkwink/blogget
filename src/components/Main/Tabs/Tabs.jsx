import style from './Tabs.module.css';

export const Tabs = props => {
  return (
    <ul className={style.list}>
      <li>
        <a href="">Главная</a>
      </li>
      <li>
        <a href="">Просмотренные</a>
      </li>
      <li>
        <a href="">Сохраненные</a>
      </li>
      <li>
        <a href="">Мои посты</a>
      </li>
    </ul>
  );
};
