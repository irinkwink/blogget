import style from './Author.module.css';
import PropTypes from 'prop-types';

export const Author = ({author, link}) => {
  return (
    <a className={style.linkAuthor} href={link}>
      {author}
    </a>
  );
};

Author.propTypes = {
  author: PropTypes.string,
  link: PropTypes.string,
};
