import { createStore, applyMiddleware, combineReducers } from 'redux';
import promiseMiddleware from 'redux-promise-middleware';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

const connection = (state = {connected: false, user: null}, action) => {
  switch(action.type) {
    case 'CONNECTION_PENDING':
      return {connected: false, user: null};
    case 'CONNECTION_FULFILLED':
      return {connected: true, user: action.payload};
    default:
      return state;
  }
}

const channels = (state = {loading: false, channels: []}, action) => {
  switch(action.type) {
    case 'FETCH_CHANNELS_PENDING':
      return {loading: true, channels: []};
    case 'FETCH_CHANNELS_FULFILLED':
      return {...state, channels: [action.payload].concat(state.channels) };
    case 'CREATE_CHANNEL':
      return {...state, channels: [action.payload].concat(state.channels) }
    default:
      return state;
  }
}

const reducers = combineReducers({
  connection,
  channels
});

const middleware = applyMiddleware(
  thunk,
  promiseMiddleware(),
  logger
);

export default createStore(reducers, middleware);