import { combineReducers } from 'redux';
import { moviesReducer } from './moviesReducer';
import { usersReducer } from './usersReducer';

export const rootReducer = combineReducers({
  movies: moviesReducer
  // users: usersReducer
});
