export const addMovies = movieArray => {
  return {
    type: 'ADD_MOVIES',
    movies: movieArray
  };
};
