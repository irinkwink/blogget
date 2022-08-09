import {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {API_URL, API_AUTH_URL} from '../api/const';

export const useBestPosts = () => {
  const token = useSelector(state => state.token);
  const [bestPosts, setBestPosts] = useState([]);

  useEffect(() => {
    let url = '';
    let options = {};

    if (token) {
      url = `${API_AUTH_URL}/best`; // https://oauth.reddit.com/best
      options = {
        headers: {
          Authorization: `bearer ${token}`,
        },
      };
    } else {
      url = `${API_URL}/best`; // https://api.reddit.com/best
    }

    fetch(url, options)
      .then(response => {
        console.log();
        return response.json();
      })
      .then((json) => {
        setBestPosts(json.data.children);
      })
      .catch(err => {
        console.log('err:', err);
      });
  }, [token]);

  return [bestPosts];
};
