import * as API from './apiCalls';

describe('apiCalls', () => {
  const url =
    'https://api.themoviedb.org/3/discover/movie?api_key=48b46b7dc12d2653fb4dcf8ae2aa6df1&language=en-US&sort_by=revenue.desc&include_adult=false&include_video=false&page=1&with_genres=27&without_genres=10751';

  const mockMovies = [{ title: 'Halloween' }, { title: 'The Conjuring' }];

  it('should call fetch with the correct params', () => {
    //UNHANDLED PROMISE REJECTION WARNING TO DEAL WITH
    window.fetch = jest.fn();

    API.fetchMovies(url);
    expect(window.fetch).toHaveBeenCalledWith(url);
  }),
    it('should return an array of movies if response is ok', async () => {
      window.fetch = jest.fn().mockImplementation(() => {
        return Promise.resolve({
          json: () => {
            return Promise.resolve({ results: mockMovies });
          },
          ok: true
        });
      });

      const movies = await API.fetchMovies(url);
      expect(movies).toEqual(mockMovies);
    }),
    it('should reject if response is not okay', () => {
      window.fetch = () => Promise.reject({ ok: false });
      const expected = Error('error fetching movies');
      expect(API.fetchMovies(url)).rejects.toEqual(expected);
    });
});
