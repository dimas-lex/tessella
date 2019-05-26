import reducer, { initState } from './reducer';
import { actionTypes } from '../actions';

const WINDOW_WIDTH = 1000;
describe('reducer', () => {
  let state;
  const RECT_WIDTH = 100;
  const rect = {
    top: 10,
    left: 100,
    width: RECT_WIDTH,
    height: 100,
  };

  beforeEach(() => {
    global.innerWidth = WINDOW_WIDTH;
    state = reducer(undefined, {
      type: actionTypes.RECALCULATE_AVAILABILITY_COUNTERS,
    });
  });

  it('should return initial state', () => {
    expect(reducer(undefined, {})).toEqual(initState);
  });

  it('should failed to add Rect to state without init', () => {
    expect(
      reducer(undefined, {
        type: actionTypes.ADD_RECT_TO_LIST,
        payload: {
          rect,
        },
      })
    ).toEqual({
      availableWidth: 0,
      availableCount: 5,
      rectList: [],
    });
  });

  it('should Add Rect to state after init', () => {
    expect(
      reducer(state, {
        type: actionTypes.ADD_RECT_TO_LIST,
        payload: {
          rect,
        },
      })
    ).toMatchObject({
      availableWidth: WINDOW_WIDTH - RECT_WIDTH, // width of one rect
      availableCount: 4,
      rectList: [rect],
    });
  });


  it('should remove second Rect from state', () => {
    state = reducer(state, {
      type: actionTypes.ADD_RECT_TO_LIST,
      payload: {
        rect,
      },
    });
    state = reducer(state, {
      type: actionTypes.ADD_RECT_TO_LIST,
      payload: {
        rect,
      },
    });

    expect(state).toMatchObject({
      availableWidth: WINDOW_WIDTH - (RECT_WIDTH * 2),
      availableCount: 3,
      rectList: [rect, rect],
    });


    expect(
      reducer(state, {
        type: actionTypes.REMOVE_RECT_TO_LIST,
        payload: {
          id: 0
        },
      })
    ).toMatchObject({
      availableWidth: WINDOW_WIDTH - RECT_WIDTH,
      availableCount: 4,
      rectList: [rect],
    });
  });

});
