import React, { PureComponent } from 'react';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import ReactList from '../../components/RectList/RectList';

import classes from './Layout.module.scss';

const ADDING_ORDER_POSITION = 100500;
const MAX_RECTS_COUNT = 5;

class Layout extends PureComponent {
  state = {
    availableWidth: 0,
    availableCount: MAX_RECTS_COUNT,

    rectList: [{
        top: 100,
        left: 300,
        width: 200,
        height: 250,
        oreder: 0,
      }, {
        top: 200,
        left: 400,
        width: 200,
        height: 250,
        oreder: 1,
    }],

    isAdding: false,
    temporary: null,
  }

  recalculateMaxAvailability = () => {
    const innerWidth = window.innerWidth;
    const usedWidths = this.state
                          .rectList.reduce(
                            (acc, rect) => acc + rect.width, 0
                          );

    this.setState({
      availableWidth: innerWidth - usedWidths,
      availableCount: MAX_RECTS_COUNT - this.state.rectList.length,
    });
  }

  componentDidMount() {
    window.addEventListener('resize', this.recalculateMaxAvailability);
    this.recalculateMaxAvailability();
  }

  onAddNewStartHandler = (e) => {
    console.log('onAddNewStartHandler', e)
    console.log('onAddNewStartHandler', e.buttons)
    console.log('onAddNewStartHandler', e.nativeEvent.button)
    if (
        e.buttons === 2
        || this.state.availableCount === 0
        || this.state.availableWidth <= 0) {
      return;
    }

    this.setState({
      isAdding: true,
      temporary: {
        left: e.clientX,
        top: e.clientY,
        width: 0,
        height: 0,
        oreder: ADDING_ORDER_POSITION,
      },
    });
  }

  onMouseMoveHandler = (e) => {
   const newRectX = e.clientX
   const newRectY = e.clientY;

    if (this.state.isAdding) {
      this.setState((state) => {
        const temporaryRect = state.temporary;
        const width = Math.min(
          newRectX - temporaryRect.left,
          state.availableWidth
        );
        const height = newRectY - temporaryRect.top;

        return {
          temporary: {
            ...temporaryRect,
            width,
            height,
          },
        };
      });
    }
  }

  onAddNewStopHandler = ()  => {
    console.log('onAddNewStopHandler')
    if (!this.state.isAdding) return;

    const temporary = this.state.temporary;
    const rectList = this.state.rectList;

    this.setState({
      isAdding: false,
      rectList: [
        ...rectList,
        {
          ...temporary,
          oreder: rectList.length,
        },
      ],
    }, this.recalculateMaxAvailability);
  }

  onRemoveItemHandler = (itemIndex) => {
    console.log('onRemoveItemHandler', itemIndex);
    const rectList = [...this.state.rectList];
    rectList.splice(itemIndex, 1);

    this.setState({
      rectList,
    }, this.recalculateMaxAvailability);
  }

  render() {
    const state = this.state;
    const list = [...state.rectList];

    if (state.isAdding) {
      list.push(state.temporary)
    }

    return (
      <React.Fragment>
        <aside className={classes.aside}>
          <SideDrawer
            availableWidth={this.state.availableWidth}
            availableCount={this.state.availableCount}
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
            onRemoveItem={this.onRemoveItemHandler}
          />
        </main>
      </React.Fragment>
    );
  }
};

export default Layout;
