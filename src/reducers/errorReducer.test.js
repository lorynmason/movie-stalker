import { errorReducer } from './errorReducer';

describe('ErrorReducer', () => {
  it('should return a default state', () => {
    const expected = '';
    const result = errorReducer('', {});

    expect(result).toEqual(expected);
  });

  it('should return state with an error message', () => {
    const mockAction = {
      type: 'HAS_ERRORED',
      message: 'an error has occurred'
    };
    const expected = 'an error has occurred';

    const result = errorReducer('', mockAction);
    expect(result).toEqual(expected);
  });
});
