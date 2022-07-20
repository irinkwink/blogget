import style from './Author.module.css';
import PropTypes from 'prop-types';
import {Text} from '../../../../../UI/Text';

export const Author = ({author, link}) => {
  console.log();
  return (
    <Text
      As='a'
      size={12}
      tsize={14}
      color='orange'
      className={style.linkAuthor}
      href={link}>
      {author}
    </Text>
  );
};

Author.propTypes = {
  author: PropTypes.string,
  link: PropTypes.string,
};
