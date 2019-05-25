import React from 'react';
import StatisticBox from '../StatisticBox/StatisticBox';

import classes from './SideDrawer.module.scss';

const sideDrawer = (props) => {
  return (
    <div className={classes.sidedrawer} >
      <h1 className={classes.sidedrawer_title}>Tessella</h1>
      <p className={classes.sidedrawer_promo}>
        Press mouse and move to create a new rectangle
      </p>

      <StatisticBox {...props} />
    </div>
  );
};

export default sideDrawer;
