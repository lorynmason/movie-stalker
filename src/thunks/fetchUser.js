import { hasErrored, loginUser, addMessage } from '../actions';

export const fetchUser = (email, password) => {
  return async dispatch => {
    try {
      const response = await fetch('http://localhost:3000/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email,
          password
        })
      });
      if (!response.ok) {
        console.log(response.statusText);
        throw Error('Email and password do not match');
      }
      const result = await response.json();
      dispatch(loginUser({ name: result.data.name, id: result.data.id }));
      dispatch(addMessage('Success! You are now Logged in'));
    } catch (err) {
      console.log(err.message)
      if (err.message.includes('Failed to fetch')) {
        dispatch(addMessage('We are having technical difficulties. Please try again later'));
      } else {
        // dispatch(hasErrored(err.message));
        dispatch(addMessage(err.message));
      }

    }
  };
};
