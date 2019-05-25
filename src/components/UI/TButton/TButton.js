import React from 'react';
import classes from './TButton.module.scss';


const tButton = (props)  => (
  <button
    className={[
      classes.tbutton,
      props.isDisabled ? classes['tbutton--disabled'] : ''
    ].join(' ')}
    onClick={props.onClick}
  >
    {props.children}
  </button>
);

export default tButton;
