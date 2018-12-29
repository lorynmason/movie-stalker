import { messageReducer } from './messageReducer';
import * as actions from '../actions';

describe('messageReducer', () => {
  it('should return a defaul state', () => {
    const expected = null;
    const result = messageReducer(null, {});
    expect(result).toEqual(expected);
  });
  it('should return state with a message', () => {
    const mockAction = {
      type: 'ADD_MESSAGE',
      message: 'Movie was added to favorites'
    };

    const expected = 'Movie was added to favorites';

    const result = messageReducer(null, mockAction);
    expect(result).toEqual(expected);
  });
});
