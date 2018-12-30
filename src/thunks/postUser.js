import { hasErrored, loginUser, addMessage } from '../actions';

export const postUser = (email, password, name) => {
  return async dispatch => {
    try {
      const response = await fetch('http://localhost:3000/api/users/new', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name,
          email,
          password
        })
      });
      if (!response.ok) {
        const error = await response.json();
        if (error.error.includes('already exists')) {
          throw Error('Email has already been used');
        } else {
          throw Error(error.error);
        }
      }
      const result = await response.json();
      const userObj = { name, id: result.id };
      localStorage.setItem('user', JSON.stringify(userObj));
      dispatch(loginUser(userObj));
      dispatch(addMessage('Success! You are now a Stalker'));
    } catch (err) {
      if (err.message.includes('Failed to fetch')) {
        dispatch(
          addMessage(
            'We are having technical difficulties. Please try again later'
          )
        );
      } else {
        dispatch(hasErrored(err.message));
        dispatch(addMessage(err.message));
      }
    }
  };
};
