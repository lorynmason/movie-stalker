import * as actions from "./index"

describe('actions', () => {
  describe('addMovies', () => {
    it('should return a type of ADD_MOVIES with an movies array', () => {
      const mockMovies = [{ title: 'Halloween' }, { title: 'The Conjuring' }];
      const expected = {type: 'ADD_MOVIES', movies: mockMovies}
      const result = actions.addMovies(mockMovies)
      expect(result).toEqual(expected)
    })
  })

  describe('loginUser', () => {
    it('should return a type of "LOGIN_USER" with a user object', () => {
      const mockUser = {name: 'Will Smith', email: 'will@smith.com', password: 'iamlegend'}
      const expected = {type: 'LOGIN_USER', user: mockUser}
      const result = actions.loginUser(mockUser)
      expect(result).toEqual(expected)
    })
  })

  describe('logoutUser', () => {
    it('should return a type of "LOGOUT_USER"', () => {
      const expected = {type: 'LOGOUT_USER'}
      const result = actions.logoutUser()
      expect(result).toEqual(expected)
    })
  })

  describe('hasErrored', () => {
    it('should return a type of "HAS_ERRORED" with a message', () => {
      const mockMessage = 'an error has occurred';
      const expected = {type: 'HAS_ERRORED', message: 'an error has occurred'}
      const result = actions.hasErrored(mockMessage)
      expect(result).toEqual(expected)
    })
  })

  // describe('addFavorite', () => {
  //   it('should return a type of "LOGIN_USER" with a user object', () => {
  //     const mockUser = {name: 'Will Smith', email: 'will@smith.com', password: 'iamlegend'}
  //     const expected = {type: 'LOGIN_USER', user: mockUser}
  //     const result = actions.loginUser(mockUser)
  //     expect(result).toEqual(expected)
  //   })
  // })

  // describe('removeFavorite', () => {
  //   it('should return a type of "LOGIN_USER" with a user object', () => {
  //     const mockUser = {name: 'Will Smith', email: 'will@smith.com', password: 'iamlegend'}
  //     const expected = {type: 'LOGIN_USER', user: mockUser}
  //     const result = actions.loginUser(mockUser)
  //     expect(result).toEqual(expected)
  //   })
  // })

  describe('retrieveAllFavorites', () => {
    it('should return a type of "RETRIEVE_ALL_FAVORTES" with a favorites array object', () => {
      const mockFavorites = [{title: 'Jaws'}, {title: 'Carrie'}]
      const expected = {type: 'RETRIEVE_ALL_FAVORITES', favorites: [{title: 'Jaws'}, {title: 'Carrie'}]}
      const result = actions.retrieveAllFavorites(mockFavorites)
      expect(result).toEqual(expected)
    })
  })

  describe('addMessage', () => {
    it('should return a type of "ADD_MESSAGE" with a message', () => {
      const mockMessage = 'it\'s all good';
      const expected = {type: 'ADD_MESSAGE', message: 'it\'s all good'}
      const result = actions.addMessage(mockMessage)
      expect(result).toEqual(expected)
    })
  })
})