import style from './Heading.module.css';
import {Text} from '../../../UI/Text';
import {useParams} from 'react-router-dom';

const name = {
  'rising': 'Главная',
  'top': 'Топ',
  'best': 'Лучшие',
  'hot': 'Горячие',
  'undefined': 'Blogget',
};

export const Heading = () => {
  const {page} = useParams();

  return (
    <Text
      As='h1'
      size={22}
      tsize={26}
      center
      className={style.heading}
    >
      {name[page]}
    </Text>
  );
};
