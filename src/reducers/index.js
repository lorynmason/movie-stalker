import { combineReducers } from 'redux';
import { moviesReducer } from './moviesReducer';
import { userReducer } from './userReducer';
import { errorReducer } from './errorReducer';
import { favoritesReducer } from './favoritesReducer';

export const rootReducer = combineReducers({
  movies: moviesReducer,
  user: userReducer,
  error: errorReducer,
  favorites: favoritesReducer
});
