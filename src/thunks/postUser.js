import { hasErrored, loginUser, addMessage } from "../actions";

export const postUser = (email, password, name) => {
  return async(dispatch) => {
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
      if(!response.ok) {
        const error = await response.json();
        if (error.error.includes('already exists')) {
          throw Error('Email has already been used')
        }
      }
      const result = await response.json();
      dispatch(loginUser({name, id: result.id}))
      dispatch(addMessage('Success! You are now a Stalker'))
    } catch(err) {
      console.log(err.message)
      // dispatch(hasErrored(err.message))
      dispatch(addMessage(err.message))
    }
  }
}