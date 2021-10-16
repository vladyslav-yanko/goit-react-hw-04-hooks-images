import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { animateScroll as scroll } from 'react-scroll';

export default function Button({ onClick }) {
  const scrollFunc = () => {
    onClick();
    scroll.scrollToBottom();
  };

 
    return (
      <button onClick={scrollFunc} className="Button" type="button">
        Load more
      </button>
    );
  
}

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
};
