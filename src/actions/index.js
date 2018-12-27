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

export const addFavorite = message => {
  return {
    type: 'ADD_FAVORITE',
    message
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
