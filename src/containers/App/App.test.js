import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import { App, mapStateToProps, mapDispatchToProps } from './App';

import { fetchMovies } from '../../thunks/fetchMovies';

import { fetchFavorites } from '../../thunks/fetchFavorites';

describe('App', () => {
  const wrapper = shallow(
    <App fetchMovies={jest.fn()} addFavoritesToStore={jest.fn()} />
  );
  it('matches snapshot with all data correctly rendered', () => {
    expect(wrapper).toMatchSnapshot();
  });

  describe('mapStateToProps', () => {
    it('should return a user object', () => {
      const mockState = {
        movies: [
          { title: 'Halloween' },
          { title: 'It' },
          { title: 'The Conjuring' }
        ],
        user: { name: 'Tanjie', id: 4 },
        error: '',
        favorites: [
          { title: 'Halloween' },
          { title: 'It' },
          { title: 'The Conjuring' }
        ],
        message: null
      };

      const expected = { name: 'Tanjie', id: 4 };

      const mappedProps = mapStateToProps(mockState);
      expect(mappedProps.user).toEqual(expected);
    });
  });
  describe('mapDispatchToProps', () => {
    const mockDispatch = jest.fn();
    let actionToDispatch = fetchMovies('http://www.google.com');

    it('should call fetchMovies on componentDidMount', () => {
      actionToDispatch = fetchMovies('http://www.google.com');

      const mappedProps = mapDispatchToProps(mockDispatch);
      mappedProps.fetchMovies('http://www.google.com');

      expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch);
    });
    it('should call addFavoritesToStore on componentDidUpdate', () => {
      actionToDispatch = fetchFavorites(1);

      const mappedProps = mapDispatchToProps(mockDispatch);
      mappedProps.addFavoritesToStore(1);

      expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch);
    });
  });
});
