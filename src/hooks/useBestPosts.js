import {useContext, useEffect, useState} from 'react';
import {API_URL, API_AUTH_URL} from '../api/const';
import {tokenContext} from '../context/tokenContext';

export const useBestPosts = () => {
  const {token} = useContext(tokenContext);
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
