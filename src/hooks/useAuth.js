import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {API_AUTH_URL} from '../api/const';
import {deleteToken} from '../store';

export const useAuth = () => {
  const [auth, setAuth] = useState({});
  const token = useSelector(state => state.token);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!token) return;

    fetch(`${API_AUTH_URL}/api/v1/me`, {
      headers: {
        Authorization: `bearer ${token}`,
      },
    })
      .then(response => {
        if (response.status === 401) {
          throw new Error(response.status);
        }
        return response.json();
      })
      .then(({name, icon_img: iconImg}) => {
        const img = iconImg.replace(/\?.*$/, '');
        setAuth({name, img});
      })
      .catch(err => {
        console.log(err);
        setAuth({});
        dispatch(deleteToken());
        window.location.href = '/';
      });
  }, [token]);

  const clearAuth = () => setAuth({});

  return [auth, clearAuth];
};
