import * as actions from "./index"

describe('actions', () => {
  it('should return a type of ADD_MOVIES with an movies array', () => {
    const mockMovies = [{ title: 'Halloween' }, { title: 'The Conjuring' }];
    const expected = {type: 'ADD_MOVIES', movies: mockMovies}
    const result = actions.addMovies(mockMovies)
    expect(result).toEqual(expected)
  })
})