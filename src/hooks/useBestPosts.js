import {useContext, useEffect, useState} from 'react';
import {URL_API} from '../api/const';
import {tokenContext} from '../context/tokenContext';

export const useBestPosts = () => {
  const {token} = useContext(tokenContext);
  const [bestPosts, setBestPosts] = useState([]);

  useEffect(() => {
    let url = '';
    let options = {};

    if (token) {
      url = `${URL_API}/best`;
      options = {
        headers: {
          Authorization: `bearer ${token}`,
        },
      };
    } else {
      url = 'https://api.reddit.com/best';
    }

    fetch(url, options)
      .then(response => {
        console.log('bestPostsResponse', response);

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