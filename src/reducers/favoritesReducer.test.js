import { favoritesReducer } from './favoritesReducer';
import * as actions from '../actions';

describe('favoritesReducer', () => {
  it('should return a default state', () => {
    const expected = [];
    const result = favoritesReducer(undefined, {});
    expect(result).toEqual(expected);
  });
  it('should return state with favorite movies', () => {
    const mockFavoriteOne = {
      id: 7,
      movie_id: 346364,
      overview:
        'In a small town in Maine, seven children known as The Losers Club come face to face with life problems, bullies and a monster that takes the shape of a clown called Pennywise.',
      poster_path:
        'https://image.tmdb.org/t/p/w500////9E2y5Q7WlCVNEhP5GiVTjhEhx1o.jpg',
      release_date: '2017-09-06',
      title: 'It',
      user_id: 4,
      vote_average: '7.2'
    };

    const mockFavoriteTwo = {
      id: 6,
      movie_id: 6479,
      overview:
        'Robert Neville is a scientist who was unable to stop the spread of the terrible virus that was incurable and man-made. Immune, Neville is now the last human survivor in what is left of New York City and perhaps the world. For three years, Neville has faithfully sent out daily radio messages, desperate to find any other survivors who might be out there. But he is not alone.',
      poster_path:
        'https://image.tmdb.org/t/p/w500////6OA0I8hhW9zftWoCYxJAzXW9UIN.jpg',
      release_date: '2007-12-14',
      title: 'I Am Legend',
      user_id: 4,
      vote_average: '7.1'
    };

    const mockAction = {
      type: 'RETRIEVE_ALL_FAVORITES',
      favorites: [mockFavoriteOne, mockFavoriteTwo]
    };

    const expected = mockAction.favorites;

    const result = favoritesReducer([], mockAction);
    expect(result).toEqual(expected);
  });
});
