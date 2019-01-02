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

  it('should call fetchMovies when the component mounts', () => {
    const wrapper = shallow(<App fetchMovies={jest.fn()} addFavoritesToStore={jest.fn()} />);

    expect(wrapper.instance().props.fetchMovies).toHaveBeenCalled()
  })

  it('should call addFavoritesToStore if there is a user logged in', () => {
    const mockUser = {name: 'Chucky', id: 2}
    const wrapper = shallow(<App addFavoritesToStore={jest.fn()} user={null} fetchMovies={jest.fn()} />)
    
    expect(wrapper.instance().props.user).toEqual(null);
    wrapper.setProps({
      user: mockUser
    })

    expect(wrapper.instance().props.addFavoritesToStore).toHaveBeenCalledWith(2);
  })

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
    const url = 'someplace.com';

    it('should dispatch fetchMovies thunk when fetchMovies is called from props', () => {
      const thunkToDispatch = fetchMovies(url);

      const mappedProps = mapDispatchToProps(mockDispatch);
      mappedProps.fetchMovies(url);

      expect(mockDispatch).toHaveBeenCalledWith(thunkToDispatch);
    })

    it('should dispatch fetchFavorites thunk when addFavoritesToStore is called from props', () => {
      const thunkToDispatch = fetchFavorites(2);

      const mappedProps = mapDispatchToProps(mockDispatch);
      mappedProps.addFavoritesToStore(2);

      expect(mockDispatch).toHaveBeenCalledWith(thunkToDispatch);
    })
  });
});
