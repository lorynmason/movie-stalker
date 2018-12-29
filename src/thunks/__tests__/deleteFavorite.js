import { deleteFavorite } from '../deleteFavorite';
import { addMessage, hasErrored } from '../../actions';

describe('postFavorites', () => {
  const mockDispatch = jest.fn();
  const mockMovie = {
    title: 'Jaws'
  };

  it('should call fetch with the correct parameters', () => {
    window.fetch = jest.fn();
    const expectedUrl = 'http://localhost:3000/api/users/2/favorites/3';
    const expectedBody = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const thunk = deleteFavorite(2, 3);
    thunk(mockDispatch);

    expect(window.fetch).toHaveBeenCalledWith(expectedUrl, expectedBody);
  });

  it('should dispatch hasErrored with a message if promise rejects', async () => {
    window.fetch = jest.fn().mockImplementation(() =>
      Promise.reject({
        message: 'an error has occurred'
      })
    );

    const thunk = deleteFavorite(2, 3);
    await thunk(mockDispatch);
    expect(mockDispatch).toHaveBeenCalledWith(
      hasErrored('an error has occurred')
    );
  });

  it('should dispatch hasErrored if the response is not ok', async () => {
    window.fetch = jest.fn().mockImplementation(() => {
      return Promise.resolve({
        ok: false,
        statusText: 'an error has occurred'
      });
    });

    const thunk = deleteFavorite(2, 3);
    await thunk(mockDispatch);
    expect(mockDispatch).toHaveBeenCalledWith(
      hasErrored('an error has occurred')
    );
  });

  it('Dispatches a success message with addMessage if response is ok', async () => {
    const mockMessage = 'Movie is no longer being Stalked';

    window.fetch = jest.fn().mockImplementation(() =>
      Promise.resolve({
        ok: true,
        json: () => {}
      })
    );

    const thunk = deleteFavorite(2, 3);
    await thunk(mockDispatch);

    expect(mockDispatch).toHaveBeenCalledWith(addMessage(mockMessage));
  });
});
