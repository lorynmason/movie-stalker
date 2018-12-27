import { shallow } from 'enzyme'
import React from 'react';
import { Login, mapStateToProps, mapDispatchToProps } from './Login';

describe('Login container', () => {
  it('should match the snapshot', () => {
    let wrapper = shallow(<Login />)
    expect(wrapper).toMatchSnapshot()
  })
})

describe('handleInputChange', () => {
  it('should update state on change', () => {
    let wrapper = shallow(<Login />)
    wrapper.find('#email-input').simulate('change', { target: { value: 'john@gmail.com',
    name: 'email' } })  
    wrapper.find('#password-input').simulate('change', { target: { value: 'Hello',
  name: 'password' } })   
    const expected = {
      name: '',
      email: 'john@gmail.com',
      password: 'Hello',
      errorMessage:'',
      newUser: false
    }
    expect(wrapper.state()).toEqual(expected)
  })
})

describe('handleSubmit', () => {
  let wrapper;
  it('should call handleSubmit and should call addUserToStore if !newUser', () => {
    const mockAddUserToStore = jest.fn()
    wrapper = shallow(<Login addUserToStore={mockAddUserToStore}/>)
    wrapper.handleSubmit = jest.fn()
    wrapper.addUserToStore = mockAddUserToStore

    wrapper.find('form').simulate('submit', {
      preventDefault: () => wrapper.handleSubmit()})

    expect(wrapper.handleSubmit).toHaveBeenCalled()
    expect(wrapper.addUserToStore).toHaveBeenCalled()

  })
  it('should call addNewUserToStore if new user',() => {
    const mockAddUserToStore = jest.fn()
    wrapper = shallow(<Login addNewUserToStore={mockAddUserToStore}/>)
    wrapper.handleSubmit = jest.fn()
    wrapper.addNewUserToStore = mockAddUserToStore
    wrapper.setState({newUser: true})

    wrapper.find('form').simulate('submit', {
      preventDefault: () => wrapper.handleSubmit()})
    expect(wrapper.addNewUserToStore).toHaveBeenCalled()
  })
})

describe('handleNewUser', () => {
  it('should set state of newUser to true', () => {
    let wrapper = shallow(<Login />)
    const expected = {"email": "", "errorMessage": "", "name": "", "newUser": true, "password": ""}
    wrapper.find('.create-account').simulate('click', {
      preventDefault: () => {
      }})
    expect(wrapper.state()).toEqual(expected)
  })
})

describe('mapStateToProps', () => {
  it('should return an object with user', () => {
    const mockState = {
      movies: [{tile: 'It', id: 0}],
      user: null
    }
    const expected = {
      user: null
    }
    const mappedProps = mapStateToProps(mockState)
    expect(mappedProps).toEqual(expected)
  })
})

describe('mapDispatchToProps', () => {
  const mockDispatch = jest.fn()
  const mappedProps = mapDispatchToProps(mockDispatch)

  it('calls dispatch with an fetchUser thunks when addUserToStore is called', () => {
    mappedProps.addUserToStore('john@gmail.com', 'password')
    expect(mockDispatch).toHaveBeenCalled()
  })

  it('calls dispatch with an postUser thunks when addNewUserToStore is called', () => {
    mappedProps.addNewUserToStore('john@gmail.com', 'password', 'John')
    expect(mockDispatch).toHaveBeenCalled()
  })
})