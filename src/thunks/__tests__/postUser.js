import { postUser } from '../postUser';
import { loginUser, hasErrored, addMessage } from '../../actions';

describe('postUser', () => {
  const email = 'me@email.com';
  const password = 'password';
  const name = 'Joe';
  const mockDispatch = jest.fn();

  it('should call fetch with the correct parameters', () => {
    window.fetch = jest.fn();
    const expectedBody = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name,
        email,
        password
      })
    };

    const thunk = postUser(email, password, name);
    thunk(mockDispatch);

    expect(window.fetch).toHaveBeenCalledWith('http://localhost:3000/api/users/new', expectedBody);
  })
  
  it('should dispatch addMessage with a message if promise rejects', async () => {
    window.fetch = jest.fn().mockImplementation(() =>
      Promise.reject({
        message: 'an error has occurred'
      })
    );

    const thunk = postUser(email, password, name);
    await thunk(mockDispatch);
    expect(mockDispatch).toHaveBeenCalledWith(addMessage('an error has occurred'));
  });

  it('should dispatch addMessage if the response is not ok', async () => {
    window.fetch = jest.fn().mockImplementation(() => {
      return Promise.resolve({
        ok: false,
        json: () => {
          return Promise.resolve({
            error: 'an error has occurred'
          })
        }
      })
    })

    const thunk = postUser(email, password, name);
    await thunk(mockDispatch);
    expect(mockDispatch).toHaveBeenCalledWith(addMessage('an error has occurred'));
  });

  it('should dispatch addMessage with a message if the response is not ok and the server has returned a status of "already exists"', async () => {
    window.fetch = jest.fn().mockImplementation(() => {
      return Promise.resolve({
        ok: false,
        json: () => {
          return Promise.resolve({
            error: 'Email already exists'
          })
        }
      })
    })

    const expected = 'Email has already been used';

    const thunk = postUser(email, password, name);
    await thunk(mockDispatch);
    expect(mockDispatch).toHaveBeenCalledWith(addMessage(expected))
  })

  it('Dispatches user data with loginUser if response is ok', async () => {
    const mockUser = {name: 'Joe', id: 2};
    
    window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
        ok: true,
        json: () => Promise.resolve({id: 2})
      })
    );
    
    const thunk = postUser(email, password, name);
    await thunk(mockDispatch);
    
    expect(mockDispatch).toHaveBeenCalledWith(loginUser(mockUser));
  });
});