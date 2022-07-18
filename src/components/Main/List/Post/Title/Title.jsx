import style from './Title.module.css';
import PropTypes from 'prop-types';

export const Title = ({title, link}) => {
  return (
    <h2 className={style.title}>
      <a className={style.linkPost} href={link}>{title}</a>
    </h2>
  );
};

Title.propTypes = {
  title: PropTypes.string,
  link: PropTypes.string,
};
