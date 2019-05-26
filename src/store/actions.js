import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://tessella-19.firebaseio.com/',
});

export const actionTypes = {
  ADD_RECT_TO_LIST: 'ADD_RECT_TO_LIST',
  REMOVE_RECT_TO_LIST: 'REMOVE_RECT_TO_LIST',
  RECALCULATE_AVAILABILITY_COUNTERS: 'RECALCULATE_AVAILABILITY_COUNTERS',
  RESET_STORE: 'RESET_STORE',
  SAVED: 'SAVED',
};

export const addRectToList = (rect) => ({
  type: actionTypes.ADD_RECT_TO_LIST,
  payload: {
    rect,
  },
});

export const removeRectFromList = (index) => {
  // imitate async dispatching
  return (dispatch) => {
    setTimeout(() => {
      dispatch({
        type: actionTypes.REMOVE_RECT_TO_LIST,
        payload: {
          index,
        },
      });
    }, 100);
  };
};

export const recalculateAvailabilityCounters = () => ({
  type: actionTypes.RECALCULATE_AVAILABILITY_COUNTERS,
});

export const resetStore = () => ({
  type: actionTypes.RESET_STORE,
});

export const saveStateToCloud = () => {
  return (dispatch, getState) => {
    const UID = makeUID(4);
    axiosInstance
      .post('/state.json', {
        id: makeUID(4),
        state: getState(),
      })
      .then(response => {
        if (response.status === 200) {
          dispatch({
            type: actionTypes.SAVED,
            payload: {
              UID,
            },
          });
        }
      })
      .catch(error => console.log(error));
  };
};

const makeUID = (length) => {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};
