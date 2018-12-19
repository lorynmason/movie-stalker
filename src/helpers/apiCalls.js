export const fetchMovies = async url => {
  try {
    const response = await fetch(url);
    const movies = await response.json();
    return movies.results;
  } catch (err) {
    throw new Error('error fetching movies');
  }
};
