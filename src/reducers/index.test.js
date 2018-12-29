import { rootReducer } from './index';
import { createStore } from 'redux';
import { moviesReducer } from './moviesReducer';
import { userReducer } from './userReducer';
import { errorReducer } from './errorReducer';
import { favoritesReducer } from './favoritesReducer';
import { messageReducer } from './messageReducer';

describe('rootReducer', () => {
  let store = createStore(rootReducer);
  it('should show initial state of movies when moviesReducer handles an action', () => {
    expect(store.getState().movies).toEqual(moviesReducer(undefined, {}));
  });

  it('should show initial state of user when userReducer handles an action', () => {
    expect(store.getState().user).toEqual(userReducer(null, {}));
  });

  it('should show initial state of error when errorReducer handles an action', () => {
    expect(store.getState().error).toEqual(errorReducer('', {}));
  });

  it('should show initial state of favorites when favoritesReducer handles an action', () => {
    expect(store.getState().favorites).toEqual(favoritesReducer([], {}));
  });

  it('should show initial state of message when messageReducer handles an action', () => {
    expect(store.getState().error).toEqual(messageReducer('', {}));
  });
});
