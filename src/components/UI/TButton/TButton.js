import React from 'react';
import PropTypes from 'prop-types';
import classes from './TButton.module.scss';


const tButton = (props)  => (
  <button
    className={[
      classes.tbutton,
      props.isDisabled ? classes['tbutton--disabled'] : '',
      props.className
    ].join(' ')}
    onClick={props.onClick}
  >
    {props.children}
  </button>
);

tButton.propTypes = {
  onClick: PropTypes.func,
  children: PropTypes.element,
  className: PropTypes.string,
};

export default tButton;
