import { postFavorites } from '../postFavorites';
import { addMessage, hasErrored } from '../../actions';

describe('postFavorites', () => {
  const mockDispatch = jest.fn();
  const mockMovie = {
    title: 'Jaws'
  };

  it('should call fetch with the correct parameters', () => {
    window.fetch = jest.fn();
    const expectedBody = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        ...mockMovie,
        user_id: 2
      })
    };

    const thunk = postFavorites(mockMovie, 2);
    thunk(mockDispatch);

    expect(window.fetch).toHaveBeenCalledWith(
      'http://localhost:3000/api/users/favorites/new',
      expectedBody
    );
  });

  it('should dispatch hasErrored with a message if promise rejects', async () => {
    window.fetch = jest.fn().mockImplementation(() =>
      Promise.reject({
        message: 'an error has occurred'
      })
    );

    const thunk = postFavorites(mockMovie, 2);
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

    const thunk = postFavorites(mockMovie, 2);
    await thunk(mockDispatch);
    expect(mockDispatch).toHaveBeenCalledWith(
      hasErrored('an error has occurred')
    );
  });

  it('Dispatches a success message with addMessage if response is ok', async () => {
    const mockMessage = 'Movie is now being Stalked';

    window.fetch = jest.fn().mockImplementation(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ message: 'Movie is now being Stalked' })
      })
    );

    const thunk = postFavorites(mockMovie, 2);
    await thunk(mockDispatch);

    expect(mockDispatch).toHaveBeenCalledWith(addMessage(mockMessage));
  });
});
