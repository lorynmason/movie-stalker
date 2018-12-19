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
  const response = await fetch(url, options);
  if (response.ok) {
    const user = await response.json();
    return user;
  }
};
