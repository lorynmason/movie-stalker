import * as API from './apiCalls';

describe('apiCalls', () => {
  const url =
    'https://api.themoviedb.org/3/';

  const mockMovies = [{ title: 'Halloween' }, { title: 'The Conjuring' }];

  describe('fetchMovies', () => {
    it('should call fetch with the correct params', () => {
      //UNHANDLED PROMISE REJECTION WARNING TO DEAL WITH
      window.fetch = jest.fn();

      API.fetchMovies(url);
      expect(window.fetch).toHaveBeenCalledWith(url);
    })

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
  })

  describe('fetchUser', () => {
    const mockOptions = {}
    it('should call fetch with the correct params', () => {
      window.fetch = jest.fn();

      API.fetchUser(url, mockOptions);

      expect(window.fetch).toHaveBeenCalledWith(url, mockOptions)
    })

    it('should return a user object if response is okay', async () => {
      window.fetch = jest.fn().mockImplementation(() => {
        return Promise.resolve({
          json: () => {
            return Promise.resolve({})
          },
          ok: true
        })
      })
      const expected = {};
      const result = await API.fetchUser(url, mockOptions);

      expect(result).toEqual(expected)
    })

    it('should return undefined if the response is not okay', async () => {
      window.fetch = () => Promise.resolve({ ok: false });
      
      const result = await API.fetchUser(url, mockOptions);
      
      expect(result).toEqual(undefined);
    })
  })

  describe('postUser', () => {
    const mockOptions = {}
    it('should call fetch with the correct params', () => {
      window.fetch = jest.fn();

      API.postUser(url, mockOptions);

      expect(window.fetch).toHaveBeenCalledWith(url, mockOptions)
    })

    it('should return a response ', async () => {
      const mockResponse = {json: jest.fn(), ok: true};
      window.fetch = jest.fn().mockImplementation(() => {
        return Promise.resolve(mockResponse)
      })
      const result = await API.postUser(url, mockOptions);

      expect(result).toEqual(mockResponse)
    })
  })
})
