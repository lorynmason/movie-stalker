import { fetchUser } from '../fetchUser';

describe.skip('fetchUser', () => {
  const email = 'me@email.com';
  const password = 'password';

  it('should call fetch with the correct parameters', () => {
    window.fetch = jest.fn();
    const expected = (email, password);

    const thunk = fetchUser(email, password);

    expect(window.fetch).toHaveBeenCalledWith(expected);
  })

  it('should throw an error if the response is not ok', async () => {
    window.fetch = jest.fn().mockImplementation(() => {
      return Promise.resolve({
        ok: false, 
        statusText: 'Nope'
      })
    })

    const result = await fetchUser(email, password);
    console.log(result)
    expect(result).toEqual('Nope');
  })

  it('should dispatch loginUser if the response is okay', () => {

  })

  it('should dispatch hasErrored if the resdponse rejects', () => {

  })
})