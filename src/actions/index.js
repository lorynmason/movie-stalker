import { Favorites } from "../components/Favorites/Favorites";

export const addMovies = movieArray => {
  return {
    type: 'ADD_MOVIES',
    movies: movieArray
  };
};

export const loginUser = user => {
  return {
    type: 'LOGIN_USER',
    user
  };
};

export const logoutUser = () => {
  return {
    type: 'LOGOUT_USER'
  };
};

export const hasErrored = message => ({
  type: 'HAS_ERRORED',
  message
});

export const addFavorite = movie => {
  return {
    type: 'ADD_FAVORITE',
    movie
  };
};

export const removeFavorite = (userId, movieId) => {
  return {
    type: 'REMOVE_FAVORITE',
    userId,
    movieId
  };
};

export const retrieveAllFavorites = favorites => {
  return {
    type: 'RETRIEVE_ALL_FAVORITES',
    favorites
  };
};
