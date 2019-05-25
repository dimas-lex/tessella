export const actionTypes = {
  ADD_RECT_TO_LIST: 'ADD_RECT_TO_LIST',
  REMOVE_RECT_TO_LIST: 'REMOVE_RECT_TO_LIST',
  RECALCULATE_AVAILABILITY_COUNTERS: 'RECALCULATE_AVAILABILITY_COUNTERS',
};

export const addRectToList = (rect) => ({
  type: actionTypes.ADD_RECT_TO_LIST,
  payload: {
    rect,
  },
});

export const removeRectFromList = (index) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch({
        type: actionTypes.REMOVE_RECT_TO_LIST,
        payload: {
          index,
        },
      });
    }, 100);
  }
}

export const recalculateAvailabilityCounters = () => ({
  type: actionTypes.RECALCULATE_AVAILABILITY_COUNTERS,
});
