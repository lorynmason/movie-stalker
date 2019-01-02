import { userReducer } from './userReducer';

describe('userReducer', () => {
  it('should return a default state', () => {
    const expected = null;
    const result = userReducer(null, {});
    expect(result).toEqual(expected);
  });
  it('should return state of null if user has logged out', () => {
    const expected = null;
    const mockAction = { type: 'LOGOUT_USER' };
    const result = userReducer(null, mockAction);
    expect(result).toEqual(expected);
  });
  it('should return state with a user', () => {
    const mockAction = {
      type: 'LOGIN_USER',
      user: { name: 'Tanjie', id: 4 }
    };
    const expected = mockAction.user;
    const result = userReducer(null, mockAction);
    expect(result).toEqual(expected);
  });
});
