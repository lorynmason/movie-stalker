import { fetchMovies } from '../fetchMovies';
import { addMovies, hasErrored } from '../../actions';

describe('fetchMovies', () => {
  let mockUrl;
  let mockDispatch;

  beforeEach(() => {
    mockUrl = 'www.someurl.com';
    mockDispatch = jest.fn();
  });

  it('should dispatch hasErrored with a message if promise rejects', async () => {
    window.fetch = jest.fn().mockImplementation(() =>
      Promise.reject({
        message: 'an error has occurred'
      })
    );

    const thunk = fetchMovies(mockUrl);
    await thunk(mockDispatch);
    expect(mockDispatch).toHaveBeenCalledWith(hasErrored('an error has occurred'));
  });

  it('should throw an error if the response is not ok', async () => {
    window.fetch = jest.fn().mockImplementation(() => {
      return Promise.resolve({
        ok: false,
        statusText: 'an error has occurred'
      })
    })

    const thunk = fetchMovies(mockUrl);
    await thunk(mockDispatch);
    expect(mockDispatch).toHaveBeenCalledWith(hasErrored('an error has occurred'));
  })

  it('Dispatches the addMovies(moviesArray) action if response is ok', async () => {
    const mockMovies = [{ name: 'Halloween' }, { name: 'It' }];
    
    window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
        ok: true,
        json: () => Promise.resolve({results: mockMovies})
      })
    );
    
    const thunk = fetchMovies(mockUrl);
    await thunk(mockDispatch);
    
    expect(mockDispatch).toHaveBeenCalledWith(addMovies(mockMovies));
  });
});

//test ALL dispatched actions and happy/sad paths