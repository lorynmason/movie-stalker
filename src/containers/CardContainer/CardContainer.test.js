import { CardContainer, mapStateToProps } from './CardContainer';
import { shallow } from 'enzyme';
import React from 'react';

describe('CardContainer', () => {
  const wrapper = shallow(<CardContainer movies={[]} addFavorite={jest.fn} />);
  describe('CardContainer Component', () => {
    expect(wrapper).toMatchSnapshot();
  });
  describe('mapStateToProps', () => {
    it('should return an object with an array of movies', () => {
      const mockState = {
        movies: [{ title: 'Halloween' }, { title: 'The Conjuring' }],
        users: []
      };
      const expected = {
        movies: [{ title: 'Halloween' }, { title: 'The Conjuring' }]
      };
      const mappedProps = mapStateToProps(mockState);
      expect(mappedProps).toEqual(expected);
    });
  });
});
