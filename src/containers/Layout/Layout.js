import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions';

import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import ReactList from '../../components/RectList/RectList';

import classes from './Layout.module.scss';

const TEMP_RECT_ID = 100500;

export class Layout extends PureComponent {
  state = {
    isAdding: false,
    newRect: null,
  }

  componentDidMount() {
    window.addEventListener('resize', this.props.recalculateMaxAvailability);
    this.props.recalculateMaxAvailability();
  }

  onAddNewStartHandler = (e) => {
    if (e.buttons === 2
        || this.props.availableCount === 0
        || this.props.availableWidth <= 0) {
      return;
    }

    this.setState({
      isAdding: true,
      newRect: {
        left: e.clientX,
        top: e.clientY,
        width: 0,
        height: 0,
        id: TEMP_RECT_ID,
      },
    });
  }

  onMouseMoveHandler = (e) => {
   const rightRect = e.clientX
   const bottomRect = e.clientY;

    if (this.state.isAdding) {
      this.setState((state) => {
        const newRect = state.newRect;
        const mouseRectWidth = rightRect - newRect.left;
        const width = Math.min(mouseRectWidth, this.props.availableWidth);

        return {
          newRect: {
            ...newRect,
            height: (bottomRect - newRect.top),
            width,
          },
        };
      });
    }
  }

  onAddNewStopHandler = () => {
    if (!this.state.isAdding) return;

    this.setState({
      isAdding: false,
    });

    this.props.addNewRect({
      ...this.state.newRect,
    });
  }

  render() {
    const state = this.state;
    const props = this.props;
    const list = Array.isArray(props.rectList)
        ? [...props.rectList]
        : [];

    if (state.isAdding) {
      list.push(state.newRect)
    }

    return (
      <React.Fragment>
        <aside className={classes.aside}>
          <SideDrawer
            availableWidth={props.availableWidth}
            availableCount={props.availableCount}
            UID={props.UID}
            onReset={props.onResetStore}
            onSave={props.saveStore}
          />
        </aside>
        <main
          className={classes.content}
          onMouseDown={this.onAddNewStartHandler}
          onMouseUp={this.onAddNewStopHandler}
          onMouseMove={this.onMouseMoveHandler}
        >
          <ReactList
            rectList={list}
            onRemoveItem={props.removeRectHandler}
          />
        </main>
      </React.Fragment>
    );
  }
};

const mapStateToProps = state => {
  return {
    rectList: state.rectList || [],
    availableWidth: state.availableWidth,
    availableCount: state.availableCount,
    UID: state.UID,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addNewRect: (rect) => dispatch(actions.addRectToList(rect)),
    removeRectHandler: (index) => dispatch(actions.removeRectFromList(index)),
    recalculateMaxAvailability: () => dispatch(actions.recalculateAvailabilityCounters()),
    onResetStore: () => dispatch(actions.resetStore()),
    saveStore: () => dispatch(actions.saveStateToCloud()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
