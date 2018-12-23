import { hasErrored, loginUser } from "../actions";

export const fetchUser = (email, password) => {
  return async(dispatch) => {
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
        throw Error(response.statusText)
      }
      const result = await response.json()
      dispatch(loginUser(result.data))
    } catch(err) {
      dispatch(hasErrored(err.message))
    }
  }
}