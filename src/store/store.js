import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducer from './reducer';
import { loadState, saveState } from './localStorage';

const logger = store => {
  return next => {
    return action => {
      console.log('[Middleware]', action);
      const res = next(action);
      console.log('[Middleware]', store.getState());
      return res;
    }
  }
};

const persistedState = loadState();
const middleware = applyMiddleware(logger, thunk);

const store = createStore(reducer, persistedState, middleware);

store.subscribe(() => {
  saveState(store.getState());
});

export default store;
