import { hasErrored, addMessage } from '../actions';

export const deleteFavorite = (userId, movieId) => {
  return async dispatch => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/users/${userId}/favorites/${movieId}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      if (!response.ok) {
        throw Error(response.statusText);
      }
      const result = await response.json();
      console.log(result);
      dispatch(addMessage('Movie was deleted from favorites'));
    } catch (err) {
      dispatch(hasErrored(err.message));
    }
  };
};
