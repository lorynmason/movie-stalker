import React from 'react';
import { shallow } from 'enzyme';
import { Card } from './Card';

describe('Card', () => {
  const mockMovie = {
    movie_id: 381288,
    overview:
      'Though Kevin has evidenced 23 personalities to his trusted psychiatrist, Dr. Fletcher, there remains one still submerged who is set to materialize and dominate all the others. Compelled to abduct thre…',
    poster_path:
      'https://image.tmdb.org/t/p/w500////rXMWOZiCt6eMX22jWuTOSdQ98bY.jpg',
    release_date: '2017-01-19',
    title: 'Split',
    vote_average: 7.2
  };
  const mockUser = {
    id: 1
  };
  const wrapper = shallow(
    <Card
      movie={mockMovie}
      key={mockMovie.title}
      addFavorite={jest.fn}
      user={mockUser}
    />
  );
  it('should render snapshot with correct data', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should call addFavorite on click', () => {
    //Test nested function call to addFavorite??
  });

  it('should change state if isFavorite to true on handleClick', () => {
    const expected = {
      isFavorite: true
    };

    wrapper.instance().handleClick();
    expect(wrapper.state()).toEqual(expected);
  });
});
