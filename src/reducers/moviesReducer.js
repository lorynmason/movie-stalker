export const moviesReducer = (state = [], action) => {
  switch (action.type) {
    case 'ADD_MOVIES':
      const cleanMovies = action.movies.map(movie => {
        return {
          title: movie.title,
          release_date: movie.release_date,
          overview: movie.overview,
          movie_id: movie.id,
          poster_path: 'https://image.tmdb.org/t/p/w500///' + movie.poster_path,
          vote_average: movie.vote_average
        };
      });
      return cleanMovies;
    default:
      return state;
  }
};
