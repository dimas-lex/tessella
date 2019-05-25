import { actionTypes } from './actions';

const MAX_RECTS_COUNT = 5;

const initState = {
  availableWidth: 0,
  availableCount: MAX_RECTS_COUNT,

  rectList: [{
    top: 100,
    left: 300,
    width: 200,
    height: 250,
    id: 0,
  }],
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
      const rectListAdded = [...state.rectList, action.payload.rect];
      return {
        ...state,
        rectList: rectListAdded,
        isAdding: false,
        ...recalculateMaxAvailability(rectListAdded),
      };

    case actionTypes.REMOVE_RECT_TO_LIST:
      const rectListRemoved = [...state.rectList];
      rectListRemoved.splice(action.payload.index, 1);

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

    default:
      return state;
  }
};

export default reducer;
