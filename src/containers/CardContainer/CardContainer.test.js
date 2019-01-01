import {
  CardContainer,
  mapStateToProps,
  mapDispatchToProps
} from './CardContainer';
import { shallow, mount } from 'enzyme';
import React from 'react';
import { postFavorites } from '../../thunks/postFavorites';
import { deleteFavorite } from '../../thunks/deleteFavorite';
import * as actions from '../../actions'; 

describe('CardContainer', () => {
  const mockFunc = jest.fn();
  const match = {
    path: '/favorites'
  };
  const mockMovies = [
    { title: 'Halloween', movie_id: 1},
    { title: 'It', movie_id: 2 },
    { title: 'The Conjuring', movie_id: 3 }
  ]
  const mockFavorites = mockMovies
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(
      <CardContainer
        movies={mockMovies}
        addFavorite={mockFunc}
        favorites={mockFavorites}
        addMessage={mockFunc}
        removeFavorite={mockFunc}
        match={match}
      />
    );
  })
    
  describe('CardContainer Component', () => {
    it('should match snapshot', () => {
      expect(wrapper).toMatchSnapshot();
    })
  });

  describe('mapStateToProps', () => {
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

    it('should return an array of movies', () => {
      const expected = [
        { title: 'Halloween' },
        { title: 'It' },
        { title: 'The Conjuring' }
      ];

      const mappedProps = mapStateToProps(mockState);
      expect(mappedProps.movies).toEqual(expected);
    });

    it('should return a user object', () => {
      const expected = { name: 'Tanjie', id: 4 };

      const mappedProps = mapStateToProps(mockState);
      expect(mappedProps.user).toEqual(expected);
    });
    
    it('should return an array of favorites', () => {
      const expected = [
        { title: 'Halloween' },
        { title: 'It' },
        { title: 'The Conjuring' }
      ];
      const mappedProps = mapStateToProps(mockState);
      expect(mappedProps.favorites).toEqual(expected);
    });
  });

  describe('mapDispatchToProps', () => {
    const mockDispatch = jest.fn();
    
    it('should dispatch postFavorites thunk when addFavorite is called from props', () => {
      const movie = {title: 'Jaws'}
      const thunkToDispatch = postFavorites(movie, 2);

      const mappedProps = mapDispatchToProps(mockDispatch);
      mappedProps.addFavorite(movie, 2);

      expect(mockDispatch).toHaveBeenCalledWith(thunkToDispatch);
    })

    it('should dispatch deleteFavorite thunk when removeFavorite is called from props', () => {
      const thunkToDispatch = deleteFavorite(2, 3);

      const mappedProps = mapDispatchToProps(mockDispatch);
      mappedProps.removeFavorite(2, 3);

      expect(mockDispatch).toHaveBeenCalledWith(thunkToDispatch);
    })

    it('should dispatch addMessage action when addMessage is called from props', () => {
      const actionToDispatch = actions.addMessage('this is my message');

      const mappedProps = mapDispatchToProps(mockDispatch);
      mappedProps.addMessage('this is my message');

      expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch);
    })
  })
});
