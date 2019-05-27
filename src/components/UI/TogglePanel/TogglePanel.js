import React, { useState } from 'react';
import PropTypes from 'prop-types';
import TButton from '../TButton/TButton';

import classes from './TogglePanel.module.scss';

const TogglePanel = (props)  => {
  const [isToggled, setToggle] = useState(false);
  const toggleHandler = () => setToggle(!isToggled);

  return (
    <div
      className={`
        ${classes.toggleButton}
        ${isToggled ? classes['toggleButton--opened'] : ''}
      `}
    >
      <TButton
        onClick={toggleHandler}
        className={`
          ${classes.toggleButton_button}
          ${isToggled ? classes['toggleButton_button--opened'] : ''}`}
      >
        {props.title}
      </TButton>
      <div
        className={`
          ${classes.toggleButton_children}
          ${ isToggled ? classes['toggleButton_children--opened'] : ''}
        `}>
        { isToggled ? props.children : null }
      </div>
    </div>
  );
};

TogglePanel.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired,
};


export default TogglePanel;
