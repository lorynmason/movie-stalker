export const addMovies = movieArray => {
  return {
    type: 'ADD_MOVIES',
    movies: movieArray
  };
};

//ADDING A NEW USER

//FETCHING USER DATA ON LOGIN

export const loginUser = user => {
  return {
    type: 'LOGIN_USER',
    user
  };
};
