import { actionTypes } from '../actions';

const MAX_RECTS_COUNT = 5;

export const initState = {
  availableWidth: 0,
  availableCount: MAX_RECTS_COUNT,
  rectList: [],
};

const recalculateMaxAvailability = (rectList) => {
  if (!rectList) return {};

  const innerWidth = window.innerWidth;
  const usedWidths = rectList.reduce(
    (acc, rect) => acc + rect.width,
    0
  );

  return {
    availableWidth: innerWidth - usedWidths,
    availableCount: MAX_RECTS_COUNT - rectList.length,
  };
};

const reducer = (state = initState, action) => {
  switch(action.type) {
    case actionTypes.ADD_RECT_TO_LIST:
      const newRect = action.payload.rect;

      if (state.availableCount <= 0) return state;
      if (state.availableWidth < newRect.width) return state;

      const newList = [...state.rectList, {
        ...newRect,
        id: new Date().getTime() ,
      }];

      return {
        ...state,
        rectList: newList,
        ...recalculateMaxAvailability(newList),
      };

    case actionTypes.REMOVE_RECT_TO_LIST:
      const rectListRemoved = [...state.rectList];
      const removedIndex = action.payload.index;
      rectListRemoved.splice(removedIndex, 1);

      return {
        ...state,
        rectList: rectListRemoved,
        ...recalculateMaxAvailability(rectListRemoved),
      };

    case actionTypes.RECALCULATE_AVAILABILITY_COUNTERS:
      return {
        ...state,
        ...recalculateMaxAvailability(state.rectList),
      };

    case actionTypes.RESET_STORE:
      return {
        ...initState,
        ...recalculateMaxAvailability(initState.rectList),
      };

    default:
      return state;
  }
};

export default reducer;
