import React from 'react';
import { shallow } from 'enzyme';
import { Menu, mapStateToProps, mapDispatchToProps } from './Menu';
import { logoutUser, addMessage } from '../../actions';

describe('Menu', () => {
  const mockUser = { id: 1 };
  const mockFunc = jest.fn();
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<Menu logoutUser={mockFunc} allFavorites={[]} user={mockUser} addMessage={mockFunc}/>);
  })
  it('should match snapshot with correct data', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should match the snapshot when there is a user', () => {
    wrapper.setState({fullMenu: true})
    expect(wrapper).toMatchSnapshot();
  })

  it('should change state of fullMenu to true when toggleMenu is called', () => {
    const expected = {
      fullMenu: true
    };
    wrapper.instance().toggleMenu();
    expect(wrapper.state()).toEqual(expected);
  });
  describe('handleClick', () => {
    it('should call props.logoutUser, props.addMessage, and toggleMenu', () => {
      wrapper.setState({fullMenu: true})
      wrapper.find('#logout').simulate('click')
      expect(mockFunc).toHaveBeenCalledTimes(2)
    })
  })

  describe('mapStateToProps', () => {
    it('should return a user object', () => {
      const mockState = { user: mockUser, logoutUser: mockFunc };

      const expected = {
        user: mockUser
      };

      const mappedProps = mapStateToProps(mockState);
      expect(mappedProps).toEqual(expected);
    });
  });

  describe('mapDispatchToProps', () => {
    it('should call logoutUser when handleClick is called', () => {
      const mockDispatch = jest.fn();
      const actionToDispatch = logoutUser();

      const mappedProps = mapDispatchToProps(mockDispatch);

      mappedProps.logoutUser();

      expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch);
    });
    it('should call addMessage action when addMessage is called', () => {
      const mockDispatch = jest.fn();
      const actionToDispatch = addMessage();

      const mappedProps = mapDispatchToProps(mockDispatch);

      mappedProps.addMessage();

      expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch);
    });
  });
});
