export const fetchMovies = async url => {
  try {
    const response = await fetch(url);
    const movies = await response.json();
    return movies.results;
  } catch (err) {
    throw new Error('error fetching movies');
  }
};

export const fetchUser = async (url, options) => {
  try {
    const response = await fetch(url, options);
    const user = await response.json();
    return user;
  } catch (err) {
    throw new Error('error fetching user');
  }
};
