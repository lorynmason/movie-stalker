export const fetchMovies = async url => {
  try {
    const response = await fetch(url);
    if (response.ok) {
      const movies = await response.json();
      return movies.results;
    } else {
      throw new Error('error fetching movies')
    }
  } catch (err) {
    // throw new Error('error fetching movies');
    console.log('catch')
    console.log(err)
  }
};

export const fetchUser = async (url, options) => {
  const response = await fetch(url, options);
  // if (response.ok) {
  //   const result = await response.json();
  //   return user;
  // }
  return response;
};

export const postUser = async (url, options) => {
  const response = await fetch(url, options);
  return response;
}
