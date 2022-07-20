import style from './Title.module.css';
import PropTypes from 'prop-types';
import {Text} from '../../../../../UI/Text';

export const Title = ({title, link}) => {
  console.log();
  return (
    <Text
      As='h2'
      className={style.title}
    >
      <Text
        As='a'
        size={18}
        tsize={24}
        className={style.linkPost}
        href={link}
      >
        {title}
      </Text>
    </Text>
  );
};

Title.propTypes = {
  title: PropTypes.string,
  link: PropTypes.string,
};
