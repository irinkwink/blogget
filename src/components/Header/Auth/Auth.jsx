import {useState} from 'react';
import style from './Auth.module.css';
import PropTypes from 'prop-types';
import {ReactComponent as AuthIcon} from './img/login.svg';
import {urlAuth} from '../../../api/auth';
import {Text} from '../../../UI/Text';
import {useDispatch} from 'react-redux';
import {deleteToken} from '../../../store/tokenReducer';
import {useAuth} from '../../../hooks/useAuth';
import Preloader from '../../../UI/Preloader';
import ErrorModal from '../../errorModal';


export const Auth = () => {
  const dispatch = useDispatch();
  const [isExit, setExit] = useState(false);
  const [auth, loading, error, clearAuth] = useAuth();

  const logOut = () => {
    dispatch(deleteToken());
    clearAuth();
    // window.location.href = '/';
  };

  return (
    <div className={style.container}>
      {error && (
        <ErrorModal error={`Ошибка авторизации: ${error}`}/>
      )}
      {loading ? (
        <Preloader size={30}/>
      ) : auth.name ? (
        <>
          <button className={style.btn}>
            <img
              className={style.img}
              src={auth.img}
              title={auth.name}
              alt={`Аватар ${auth.name}`}
              onClick={() => setExit(!isExit)}
            />
          </button>
          {isExit && (
            <button
              className={style.logout}
              onClick={logOut}
            >
              Выйти
            </button>
          )}
        </>
      ) : (
        <Text className={style.authLink} As='a' href={urlAuth}>
          <AuthIcon className={style.svg} width={128} height={128} />
        </Text>
      )}
    </div>
  );
};

Auth.propTypes = {
  token: PropTypes.string,
  delToken: PropTypes.func,
};
