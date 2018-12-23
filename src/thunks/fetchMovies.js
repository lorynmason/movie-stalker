import { addMovies } from '../actions';

export const fetchMovies = url => {
  return async dispatch => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw Error(response.statusText);
      }
      const movies = await response.json();
      dispatch(addMovies(movies.results));
    } catch (error) {
      console.log(error.message);
    }
  };
};

//Dispatch loader/error actions??
