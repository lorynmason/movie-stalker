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
  }
}