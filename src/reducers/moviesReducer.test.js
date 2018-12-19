import { moviesReducer } from './moviesReducer'
import * as actions from '../actions'

describe('moviesReducer', () => {
  it('should return a default state', () => {
    const expected = []
    const result = moviesReducer(undefined, {})
    expect(result).toEqual(expected)
  })
  it('should return state with an array of clean movies', () => {
    const uncleanMovies =  [{
      "vote_count": 9545,
      "id": 346364,
      "video": false,
      "vote_average": 7.2,
      "title": "It",
      "popularity": 15.24,
      "poster_path": "/9E2y5Q7WlCVNEhP5GiVTjhEhx1o.jpg",
      "original_language": "en",
      "original_title": "It",
      "genre_ids": [
          27,
          53
      ],
      "backdrop_path": "/tcheoA2nPATCm2vvXw2hVQoaEFD.jpg",
      "adult": false,
      "overview": "In a small town in Maine, seven children known as The Losers Club come face to face with life problems, bullies and a monster that takes the shape of a clown called Pennywise.",
      "release_date": "2017-09-06"
  }]
  const expected = [
    {
      "id": 346364,
      "isFavorite": false,
      "overview": "In a small town in Maine, seven children known as The Losers Club come face to face with life problems, bullies and a monster that takes the shape of a clown called Pennywise.",
      "poster": "https://image.tmdb.org/t/p/w500////9E2y5Q7WlCVNEhP5GiVTjhEhx1o.jpg",
      "releaseDate": "2017-09-06",
      "title": "It",
    }
  ]
  const result = moviesReducer([],actions.addMovies(uncleanMovies))
  expect(result).toEqual(expected)
  })
})