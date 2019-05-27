import React from 'react';
import PropTypes from 'prop-types';
import classes from './Rectangle.module.scss';


const rectangle = (props) => {
  const styles = {
    top: props.top,
    left: props.left,
    width: props.width,
    height: props.height,
    zIndex: props.id,
  };

  const isSmallBox = (props.width * props.height) < 2000;

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
};

rectangle.propsTypes = {
  top: PropTypes.number.isRequired,
  left: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  zIndex: PropTypes.number.isRequired,
};

export default React.memo(rectangle);
