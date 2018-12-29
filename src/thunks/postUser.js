import { hasErrored, loginUser } from "../actions";

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
        throw Error(response.statusText)
      }
      const result = await response.json()
      dispatch(loginUser({name, id: result.id}))
    } catch(err) {
      dispatch(hasErrored(err.message))
    }
  }
}