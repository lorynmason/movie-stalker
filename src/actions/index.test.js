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
})