import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import { key } from '../../apikey';
import { App, mapStateToProps, mapDispatchToProps } from './App';
import { fetchMovies } from '../../thunks/fetchMovies';
import { fetchFavorites } from '../../thunks/fetchFavorites';
import { loginUser } from '../../actions';
import LocalStorageMock from './localStorageMock';

jest.mock('../../thunks/fetchMovies');
jest.mock('../../thunks/fetchFavorites');

describe('App', () => {
  const wrapper = shallow(
    <App fetchMovies={jest.fn()} addFavoritesToStore={jest.fn()} />
  );
  it('matches snapshot with all data correctly rendered', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should call fetchMovies when the component mounts', () => {
    const expected = `https://api.themoviedb.org/3/discover/movie?api_key=${key}&language=en-US&sort_by=revenue.desc&include_adult=false&include_video=false&page=1&with_genres=27&without_genres=10751`;
    const wrapper = shallow(<App fetchMovies={jest.fn()} addFavoritesToStore={jest.fn()} />);
    const { fetchMovies } = wrapper.instance().props
    
    expect(fetchMovies).toHaveBeenCalledWith(expected);
  })

  it('should call addFavoritesToStore if there is a user logged in', () => {
    const mockUser = {name: 'Chucky', id: 2}
    const wrapper = shallow(<App addFavoritesToStore={jest.fn()} user={null} fetchMovies={jest.fn()} />)
    
    expect(wrapper.instance().props.user).toEqual(null);
    wrapper.setProps({
      user: mockUser
    })

    expect(wrapper.instance().props.addFavoritesToStore).toHaveBeenCalledWith(2);
  });

  describe('checkLocalStorage', () => {
    it('should pull a user from local storage and call addStoredUser with the user object', () => {
      const mockUser = {name: 'Jason V', id: 1}
      
      window.localStorage = new LocalStorageMock();
      localStorage.setItem('user', JSON.stringify(mockUser))

      const wrapper = shallow(
      <App 
        addFavoritesToStore={jest.fn()} 
        user={null} 
        fetchMovies={jest.fn()} 
      />);

      wrapper.setProps({addStoredUser: jest.fn()});
      const { addStoredUser } = wrapper.instance().props;
      wrapper.instance().checkLocalStorage();
      
      expect(addStoredUser).toHaveBeenCalledWith(mockUser);
    });
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
    const url = 'someplace.com';

    it('should dispatch fetchMovies thunk when fetchMovies is called from props', () => {
      fetchMovies.mockImplementation(() => {});

      const expected = fetchMovies(url);

      const mappedProps = mapDispatchToProps(mockDispatch);
      mappedProps.fetchMovies(url);

      expect(mockDispatch).toHaveBeenCalledWith(expected);
    })

    it('should dispatch fetchFavorites thunk when addFavoritesToStore is called from props', () => {
      fetchFavorites.mockImplementation(() => {})
      const expected = fetchFavorites(2);

      const mappedProps = mapDispatchToProps(mockDispatch);
      mappedProps.addFavoritesToStore(2);

      expect(mockDispatch).toHaveBeenCalledWith(expected);
    });

    it('should dispatch loginUser action when addStoredUser is called', () => {
      const mockUser = {name: "Bride Of Chucky", id: 4}
      const expected = loginUser(mockUser);

      const mappedProps = mapDispatchToProps(mockDispatch);
      mappedProps.addStoredUser(mockUser);

      expect(mockDispatch).toHaveBeenCalledWith(expected);
    })
  });
});