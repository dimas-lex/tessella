import React from 'react';
import classes from './Rectangle.module.scss';


const rectangle = (props) => {
  const styles = {
    top: props.top,
    left: props.left,
    width: props.width,
    height: props.height,
    zIndex: props.order,
  };

  const isSmallBox = (props.width * props.height) < 2500;

  const onClickHandler = e => {
    e.preventDefault();
    props.onItemClick();
  };

  return (
    <div
      className={classes.rectangle}
      style={styles}
      onContextMenu={onClickHandler}
    >
      <div className={classes.rectangle_info}>
        {
          isSmallBox
            ? 'x'
            :'Right Click to remove'
        }
      </div>
    </div>
  );
}

export default React.memo(rectangle);
