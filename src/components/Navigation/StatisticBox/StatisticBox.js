import React from 'react';
import classes from './StatisticBox.module.scss';


const getWidthInfo = (availableWidth) => {
  return (availableWidth > 0) ?
      (
        <React.Fragment>
          <span className={classes.statistic_title}>
            Available width:
          </span>
          <span className={classes.statistic_values}>
            { availableWidth }px
          </span>
        </React.Fragment>
      )
    : (
        <span className={classes.statistic_title}>
          There is no space left. Please remove some items.
        </span>
    );
};

const statisticBox = (props) => {
  const widthInfoBox = getWidthInfo(props.availableWidth);

  return (
    <div className={classes.statistic}>
      <div className={classes.statistic_row}>{ widthInfoBox }</div>
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
};

export default statisticBox;
