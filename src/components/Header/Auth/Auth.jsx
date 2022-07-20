import style from './Auth.module.css';
import PropTypes from 'prop-types';
import {ReactComponent as AuthIcon} from './img/login.svg';

export const Auth = ({auth}) => {
  console.log();
  return (
    <button className={style.button}>
      {auth ? auth : (
        <AuthIcon className={style.svg} width={128} height={128} />
      )
      }
    </button>
  );
};

Auth.propTypes = {
  auth: PropTypes.bool,
};
