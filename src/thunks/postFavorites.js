import { hasErrored, addMessage } from '../actions';

export const postFavorites = (movie, userId) => {
  return async dispatch => {
    try {
      const response = await fetch(
        'http://localhost:3000/api/users/favorites/new',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            ...movie,
            user_id: userId
          })
        }
      );
      if (!response.ok) {
        throw Error(response.statusText);
      }
      const result = await response.json();
      console.log(result)
      dispatch(addMessage('Movie is now being Stalked'));
    } catch (err) {
      dispatch(hasErrored(err.message));
      dispatch(addMessage('Internal Server Error, Failed to Stalk Movie'))
    }
  };
};
