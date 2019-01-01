import React from 'react';
import { shallow, mount } from 'enzyme';
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

  let mockUser = {
    id: 1
  };

  const mockFunc = jest.fn();
  
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(
      <Card
      movie={mockMovie}
      user={mockUser}
      addFavorite={mockFunc}
      onClick={mockFunc}
      isFavorite={false}
      sendMessage={mockFunc}
      removeFavorite={mockFunc}
      />
    );
  })
      
  it('should render snapshot with correct data', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should simulate card being clicked on ', () => {
    wrapper.find('i').simulate('click');
    expect(mockFunc.mock.calls.length).toEqual(1);
  });

  it('should call removeFavorite if the user clicks and card is already favorited', () => {
    wrapper = wrapper = shallow(
      <Card
      movie={mockMovie}
      user={mockUser}
      addFavorite={mockFunc}
      onClick={mockFunc}
      isFavorite={true}
      sendMessage={mockFunc}
      removeFavorite={mockFunc}
      />
    );
    wrapper.find('i').simulate('click');
    expect(mockFunc).toHaveBeenCalled();
  })

  it('should call sendMessage with a message if the user clicks and is not logged in', () => {
    wrapper.find('i').simulate('click');
    mockUser = null
    expect(mockFunc).toHaveBeenCalled();
  })

  it('should initially render favorite button as an empty heart', () => {
    const result = wrapper.find('i').hasClass('far fa-heart');
    expect(result).toEqual(true);
  });

  it('should render favorite button as a broken heart on click', () => {
    wrapper = shallow(
      <Card
        movie={mockMovie}
        user={mockUser}
        addFavorite={mockFunc}
        isFavorite={true}
        sendMessage={mockFunc}
        removeFavorite={mockFunc}
      />
    );

    wrapper.find('i').simulate('click');
    const result = wrapper.find('i').hasClass('fas fa-heart-broken');
    expect(result).toEqual(true);
  });
});
