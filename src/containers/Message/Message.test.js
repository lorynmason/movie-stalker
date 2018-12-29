import React from 'react';
import { shallow } from 'enzyme';
import { Message, mapDispatchToProps } from './Message';

describe('Message Container', () => {
  let wrapper = shallow(<Message />)
  it('should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot()
  })
  it('should match the snapshot if there is a message', () => {
    let message = 'There is a Messsage'
    wrapper = shallow(<Message message={message}/>)
    expect(wrapper).toMatchSnapshot()
  })
})
  
it('should call addFavoritesToStore if theres a user', () => {
  const user = {id: 1}
  const mockAddFavoritesToStore = jest.fn()
  const mockAddMessage = jest.fn()
  let wrapper = shallow(<Message addMessage={mockAddMessage} addFavoritesToStore={mockAddFavoritesToStore} user={user} message={'message'}/>)
  expect(mockAddFavoritesToStore).toHaveBeenCalled()
})

describe('mapDispatchToProps', () => {
  const mockDispatch = jest.fn()
  const mappedProps = mapDispatchToProps(mockDispatch)

  it('calls dispatch with an addMessage action when addMessage is called', () => {
    mappedProps.addMessage('There is a Message')
    expect(mockDispatch).toHaveBeenCalled()
  })

  it('calls dispatch with an fetchFavorites thunks when addFavoritesToStore is called', () => {
    mappedProps.addFavoritesToStore(1)
    expect(mockDispatch).toHaveBeenCalled()
  })
})