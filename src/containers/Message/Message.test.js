import React from 'react';
import { shallow, mount } from 'enzyme';
import { Message, mapDispatchToProps } from './Message';
import { addMessage } from '../../actions';
import { fetchFavorites } from '../../thunks/fetchFavorites';

jest.mock('../../thunks/fetchFavorites');

describe('Message Container', () => {
  let wrapper = shallow(<Message />);
  it('should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
  it('should match the snapshot if there is a message', () => {
    let message = 'There is a Messsage';
    wrapper = shallow(<Message message={message} />);
    expect(wrapper).toMatchSnapshot();
  });
});
it('should call addFavoritesToStore if theres a user', () => {
  const user = { id: 1 };
  const mockAddFavoritesToStore = jest.fn();
  const mockAddMessage = jest.fn();

  shallow(
    <Message
      addMessage={mockAddMessage}
      addFavoritesToStore={mockAddFavoritesToStore}
      user={user}
      message={'message'}
    />
  );

  expect(mockAddFavoritesToStore).toHaveBeenCalled();
});

describe('setTimeout', () => {
  jest.useFakeTimers();

  it('should call setTimeout', () => {
    shallow(<Message addMessage={jest.fn()} />);

    expect(setTimeout).toHaveBeenCalledTimes(3);
  });
  it('should call addMessage when setTimeout runs', () => {
    const addMessage = jest.fn();
    const wrapper = shallow(<Message />);
    setTimeout(() => {
      expect(addMessage).toHaveBeenCalled();
    }, 1500);
  });
});

describe('mapDispatchToProps', () => {
  const mockDispatch = jest.fn();
  const mappedProps = mapDispatchToProps(mockDispatch);

<<<<<<< HEAD
  it('calls dispatch with an addMessage thunk when addMessage is called', () => {
    const expected = addMessage('You have a message');
    mappedProps.addMessage('You have a message')
    expect(mockDispatch).toHaveBeenCalledWith(expected)
  });

  it('calls dispatch with an fetchFavorites thunks when addFavoritesToStore is called', () => {
    fetchFavorites.mockImplementation(() => {})
    const expected = fetchFavorites(2);

    mappedProps.addFavoritesToStore(2);

    expect(mockDispatch).toHaveBeenCalledWith(expected);
=======
  it('calls dispatch with an addMessage action when addMessage is called', () => {
    mappedProps.addMessage('There is a Message');
    expect(mockDispatch).toHaveBeenCalled();
  });

  it('calls dispatch with an fetchFavorites thunks when addFavoritesToStore is called', () => {
    mappedProps.addFavoritesToStore(1);
    expect(mockDispatch).toHaveBeenCalled();
>>>>>>> Add proptypes and refactor settimeout tests in Message component
  });
});
