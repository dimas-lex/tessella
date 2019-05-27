import React, { useState } from 'react';
import StatisticBox from '../StatisticBox/StatisticBox';
import TButton from '../../UI/TButton/TButton';
import TogglePanel from '../../UI/TogglePanel/TogglePanel';
import TInput from '../../UI/TInput/TInput';

import classes from './SideDrawer.module.scss';

function SideDrawer (props) {
  const [loadingCode, setLoadCode] = useState('');
  const codeChangeHandler = (e) => setLoadCode(e.target.value);

  return (
    <div className={classes.sidedrawer} >
      <h1 className={classes.sidedrawer_title}>Tessella</h1>
      <p className={classes.sidedrawer_promo}>
        Press mouse and move to create a new rectangle
      </p>

      <StatisticBox {...props} />
      <TButton className={classes.sidedrawer_control} onClick={props.onReset}> Reset Store </TButton>
      {
        props.UID !== null
          ? `Saved. Your code is ${props.UID}`
          : <TButton
              className={classes.sidedrawer_control}
              onClick={props.onSave}
            >
              Save Store To Cloud
            </TButton>
      }
      <TogglePanel title="Want to Load?">
        <React.Fragment>
          <TInput
            label='Put your code here:'
            value={loadingCode}
            onChange={codeChangeHandler}
          />
          <TButton
            className={classes.sidedrawer_control}
            onClick={props.onLoad}
          >
            Load
          </TButton>
        </React.Fragment>

      </TogglePanel>

    </div>
  );
};

export default SideDrawer;
