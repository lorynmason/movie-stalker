import { addMovies, hasErrored } from '../actions';

export const fetchMovies = url => {
  return async dispatch => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        console.log(response)
        throw Error(response.statusText);
      }
      const movies = await response.json();
      dispatch(addMovies(movies.results));
    } catch (error) {
      dispatch(hasErrored(error.message));
    }
  };
};