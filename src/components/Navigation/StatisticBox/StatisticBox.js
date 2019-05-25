import React from 'react';
import classes from './StatisticBox.module.scss';


const statisticBox = (props) => (
  <div className={classes.statistic}>
    <div className={classes.statistic_row}>
      <span className={classes.statistic_title}>
        Available width:
      </span>
      <span className={classes.statistic_values}>
        { props.availableWidth }px
      </span>
    </div>
    <div className={classes.statistic_row}>
      <span className={classes.statistic_title}>
        Available Rectangles:
      </span>
      <span className={classes.statistic_values}>
       { props.availableCount }
      </span>
    </div>
  </div>
);

export default statisticBox;
