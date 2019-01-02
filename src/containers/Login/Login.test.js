import { shallow, mount } from 'enzyme';
import React from 'react';
import { Login, mapStateToProps, mapDispatchToProps } from './Login';

describe('Login container', () => {
  it('should match the snapshot', () => {
    let wrapper = shallow(<Login />, { disableLifecycleMethods: true });
    expect(wrapper).toMatchSnapshot();
  });
  it('should call call focus on the emailInput on componentDidMount', () => {
    const wrapper = mount(<Login />);
    const { emailInput } = wrapper.instance();

    jest.spyOn(emailInput.current, 'focus');

    wrapper.instance().componentDidMount();

    expect(emailInput.current.focus).toHaveBeenCalled();
  });
});

describe('handleInputChange', () => {
  it('should update state on change', () => {
    let wrapper = shallow(<Login />, { disableLifecycleMethods: true });
    wrapper.find('#email-input').simulate('change', {
      target: {
        value: 'john@gmail.com',
        name: 'email'
      }
    });
    wrapper.find('#password-input').simulate('change', {
      target: {
        value: 'Hello',
        name: 'password'
      }
    });
    const expected = {
      name: '',
      email: 'john@gmail.com',
      password: 'Hello',
      errorMessage: '',
      newUser: false
    };
    expect(wrapper.state()).toEqual(expected);
  });
});

describe('handleSubmit', () => {
  let wrapper;
  it('should call handleSubmit and should call addUserToStore if !newUser', () => {
    const mockAddUserToStore = jest.fn();
    wrapper = shallow(<Login addUserToStore={mockAddUserToStore} />, {
      disableLifecycleMethods: true
    });
    wrapper.handleSubmit = jest.fn();
    wrapper.addUserToStore = mockAddUserToStore;

    wrapper.find('form').simulate('submit', {
      preventDefault: () => wrapper.handleSubmit()
    });

    expect(wrapper.handleSubmit).toHaveBeenCalled();
    expect(wrapper.addUserToStore).toHaveBeenCalled();
  });
  it('should call addNewUserToStore if new user', () => {
    const mockAddUserToStore = jest.fn();
    wrapper = shallow(<Login addNewUserToStore={mockAddUserToStore} />, {
      disableLifecycleMethods: true
    });
    wrapper.handleSubmit = jest.fn();
    wrapper.addNewUserToStore = mockAddUserToStore;
    wrapper.setState({ newUser: true });

    wrapper.find('form').simulate('submit', {
      preventDefault: () => wrapper.handleSubmit()
    });
    expect(wrapper.addNewUserToStore).toHaveBeenCalled();
  });
});

describe('handleNewUser', () => {
  it('should toggle the state of newUser', () => {
    let wrapper = shallow(<Login />, { disableLifecycleMethods: true });

    wrapper.find('.create-account').simulate('click', {
      preventDefault: jest.fn()
    });
    expect(wrapper.state().newUser).toEqual(true);

    wrapper.find('.create-account').simulate('click', {
      preventDefault: jest.fn()
    });
    expect(wrapper.state().newUser).toEqual(false);
  });
});

describe('mapStateToProps', () => {
  it('should return an object with user', () => {
    const mockState = {
      movies: [{ tile: 'It', id: 0 }],
      user: null
    };
    const expected = {
      user: null
    };
    const mappedProps = mapStateToProps(mockState);
    expect(mappedProps).toEqual(expected);
  });
});

describe('mapDispatchToProps', () => {
  const mockDispatch = jest.fn();
  const mappedProps = mapDispatchToProps(mockDispatch);

  it('calls dispatch with an fetchUser thunks when addUserToStore is called', () => {
    mappedProps.addUserToStore('john@gmail.com', 'password');
    expect(mockDispatch).toHaveBeenCalled();
  });

  it('calls dispatch with an postUser thunks when addNewUserToStore is called', () => {
    mappedProps.addNewUserToStore('john@gmail.com', 'password', 'John');
    expect(mockDispatch).toHaveBeenCalled();
  });
});
