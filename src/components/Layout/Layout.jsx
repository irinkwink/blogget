import React from 'react';
import style from './Layout.module.css';
import PropTypes from 'prop-types';

export const Layout = ({children}) => {
  console.log('children: ', children);
  console.log(typeof children);
  return (
    <div className={style.container}>
      {children}
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.elementType,
};
