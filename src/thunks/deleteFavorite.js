import { hasErrored } from '../actions';

export const deleteFavorite = (userId, movieId) => {
  return async (dispatch) => {
    try {
      const response = await fetch(`http://localhost:3000/api/users/${userId}/favorites/${movieId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (!response.ok) {
        throw Error(response.statusText);
      }
      console.log(response)
    } catch(err) {
      dispatch(hasErrored(err.message));
    }
  }
}