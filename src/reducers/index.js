import { combineReducers } from 'redux';
import { moviesReducer } from './moviesReducer';
import { userReducer } from './userReducer';
import { errorReducer } from './errorReducer';

export const rootReducer = combineReducers({
  movies: moviesReducer,
  user: userReducer,
  error: errorReducer
});
