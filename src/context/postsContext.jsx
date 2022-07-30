import React from 'react';
import PropTypes from 'prop-types';
import {useBestPosts} from '../hooks/useBestPosts';

export const postsContext = React.createContext({});

export const PostsContextProvider = ({children}) => {
  const [bestPosts] = useBestPosts([]);

  return (
    <postsContext.Provider value={{bestPosts}}>
      {children}
    </postsContext.Provider>
  );
};

PostsContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
