import React from 'react';
import { shallow } from 'enzyme';
import { Menu, mapStateToProps, mapDispatchToProps } from './Menu';

import { logoutUser } from '../../actions';

describe('Menu', () => {
  const mockUser = { id: 1 };
  const mockFunc = jest.fn();
  const wrapper = shallow(<Menu logoutUser={mockFunc} />);
  it('should match snapshot with correct data', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should change state of fullMenu to true when toggleMenu is called', () => {
    const expected = {
      fullMenu: true
    };
    wrapper.instance().toggleMenu();
    expect(wrapper.state()).toEqual(expected);
  });

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
  });
});
