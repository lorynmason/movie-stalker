import { fetchUser } from '../fetchUser';
import { loginUser, hasErrored } from '../../actions';

describe('fetchUser', () => {
  const email = 'me@email.com';
  const password = 'password';
  const mockDispatch = jest.fn();

  it('should call fetch with the correct parameters', () => {
    window.fetch = jest.fn();
    const expectedBody = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email,
        password
      })
    };

    const thunk = fetchUser(email, password);
    thunk(mockDispatch);

    expect(window.fetch).toHaveBeenCalledWith('http://localhost:3000/api/users', expectedBody);
  })
  
  it('should dispatch hasErrored with a message if promise rejects', async () => {
    window.fetch = jest.fn().mockImplementation(() =>
      Promise.reject({
        message: 'an error has occurred'
      })
    );

    const thunk = fetchUser(email, password);
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

    const thunk = fetchUser(email, password);
    await thunk(mockDispatch);
    expect(mockDispatch).toHaveBeenCalledWith(hasErrored('an error has occurred'));
  })

  it('Dispatches user data with loginUser if response is ok', async () => {
    const mockUser = {name: 'Joe', id: 2};
    
    window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
        ok: true,
        json: () => Promise.resolve({data: {name: 'Joe', id: 2}})
      })
    );
    
    const thunk = fetchUser(email, password);
    await thunk(mockDispatch);
    
    expect(mockDispatch).toHaveBeenCalledWith(loginUser(mockUser));
  });
});