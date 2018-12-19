export const moviesReducer = (state = [], action) => {
  switch (action.type) {
    case 'ADD_MOVIES':
      const cleanMovies = action.movies.map(movie => {
        return {
          title: movie.title,
          releaseDate: movie.release_date,
          overview: movie.overview,
          id: movie.id,
          poster: movie.poster_path,
          isFavorite: false
        };
      });
      return cleanMovies;
    default:
      return state;
  }
};
