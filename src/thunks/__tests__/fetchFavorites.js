import { fetchFavorites } from '../fetchFavorites';
import { retrieveAllFavorites, hasErrored } from '../../actions';

describe('postFavorites', () => {
  const mockDispatch = jest.fn();

  it('should call fetch with the correct parameters', () => {
    window.fetch = jest.fn();
    const expected = `http://localhost:3000/api/users/2/favorites`;

    const thunk = fetchFavorites(2);
    thunk(mockDispatch);

    expect(window.fetch).toHaveBeenCalledWith(expected);
  })
  
  it('should dispatch hasErrored with a message if promise rejects', async () => {
    window.fetch = jest.fn().mockImplementation(() =>
      Promise.reject({
        message: 'an error has occurred'
      })
    );

    const thunk = fetchFavorites(2);
    await thunk(mockDispatch);

    expect(mockDispatch).toHaveBeenCalledWith(hasErrored('an error has occurred'));
  });

  it('should dispatch hasErrored if the response is not ok', async () => {
    window.fetch = jest.fn().mockImplementation(() => {
      return Promise.resolve({
        ok: false,
        statusText: 'an error has occurred'
      })
    })

    const thunk = fetchFavorites(2);
    await thunk(mockDispatch);
    expect(mockDispatch).toHaveBeenCalledWith(hasErrored('an error has occurred'));
  })

  it('Dispatches aan array of movies with retrieveAllFavorites if response is ok', async () => {
    const mockMovies = [{title: 'Jaws'}, {title: 'Carrie'}]
    
    window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
        ok: true,
        json: () => Promise.resolve({data: [{title: 'Jaws'}, {title: 'Carrie'}]})
      })
    );
    
    const thunk = fetchFavorites(2);
    await thunk(mockDispatch);
    
    expect(mockDispatch).toHaveBeenCalledWith(retrieveAllFavorites(mockMovies));
  });
});