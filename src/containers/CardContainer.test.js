import { CardContainer, mapStateToProps } from './CardContainer'

describe('CardContainer', () => {
  describe('CardContainer Component', () => {
    
  })
  describe('mapStateToProps', () => {
    it('should return an object with an array of movies', () => {
      const mockState = {movies:[{ title: 'Halloween' }, { title: 'The Conjuring' }], users: []}
      const expected = {movies:[{ title: 'Halloween' }, { title: 'The Conjuring' }]}
      const mappedProps = mapStateToProps(mockState)
      expect(mappedProps).toEqual(expected)

    })
  })
})