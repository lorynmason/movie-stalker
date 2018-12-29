import {
  CardContainer,
  mapStateToProps,
  mapDispatchToProps
} from './CardContainer';
import { shallow } from 'enzyme';
import React from 'react';

describe('CardContainer', () => {
  const mockFunc = jest.fn();
  const match = {
    path: '/favorites'
  };
  let wrapper = shallow(
    <CardContainer
      movies={[]}
      addFavorite={mockFunc}
      favorites={[]}
      sendMessage={mockFunc}
      removeFavorite={mockFunc}
      match={match}
    />
  );
  describe('CardContainer Component', () => {
    expect(wrapper).toMatchSnapshot();
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
});
