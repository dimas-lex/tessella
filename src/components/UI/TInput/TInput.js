import React from 'react';
import classes from './TInput.module.scss';

const TInput = (props) => {
  return (
    <div className={classes.tinput}>
      <label className={classes.tinput_label}>
        {props.label}
        <input className={classes.tinput_input} {...props} />
      </label>
    </div>
  );
};

export default TInput;
