import { hasErrored, loginUser, addMessage } from "../actions";

export const fetchUser = (email, password) => {
  return async (dispatch) => {
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
      if(!response.ok) {
        dispatch(addMessage('Password or Email does not Match'))
        throw Error(response.statusText)
      }
      const result = await response.json()
      dispatch(loginUser({name: result.data.name, id: result.data.id}))
      dispatch(addMessage('Sucess! You are now Logged in'))
    } catch(err) {
      console.log(err)
      dispatch(hasErrored(err.message))
      dispatch(addMessage('Internal Server Error, Failed to Login'))
    }
  }
}