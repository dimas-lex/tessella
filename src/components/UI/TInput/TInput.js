import React, { useState } from 'react';
import classes from './TInput.module.scss';

const TInput = React.memo((props) => {
  const [isValid, setValidation] = useState(true);
  const [value, setValue] = useState('');


  const onChange = (e) => {
    e.preventDefault();
    const value = e.target.value;
    const iValue = parseFloat(value)

    setValidation((iValue > 10));
    setValue(value);
  }

  return (
    <div className={classes.tinput}>
      <label className={classes.tinput_label}>
        {props.label}
        <input
          className={classes.tinput_input}
          {...props}
          value={value}
          onChange={onChange}
        />
      </label>
      <div className={[classes.tinput_error, !isValid && classes['tinput_error--visible'] ].join(' ')}>
        Some error message;
      </div>
    </div>
  );
});

export default TInput;
