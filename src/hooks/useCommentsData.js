import {useEffect, useState} from 'react';
import {API_URL} from '../api/const';

export const useCommentsData = (id) => {
  const [commentsData, setCommentsData] = useState({});

  useEffect(() => {
    fetch(`${API_URL}/comments/${id}`)
      .then(response => {
        console.log();
        return response.json();
      })
      .then((data) => {
        setCommentsData(data);
      })
      .catch(err => {
        console.log('err:', err);
      });
  }, []);

  return [commentsData];
};
