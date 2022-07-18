import style from './Heading.module.css';
import PropTypes from 'prop-types';

export const Heading = ({text}) => {
  return (
    <h1 className={style.heading}>{text}</h1>
  );
};

Heading.propTypes = {
  text: PropTypes.string,
};
