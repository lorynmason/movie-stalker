import { hasErrored, retrieveAllFavorites } from "../actions";

export const fetchFavorites = (userId) => {
  return async(dispatch) => {
    try {
      const response = await fetch(`http://localhost:3000/api/users/${userId}/favorites`);
      if (!response.ok) {
        throw Error(response.statusText)
      }
      const result = await response.json()
      console.log(result)
      dispatch(retrieveAllFavorites(result.data))
    } catch(err) {
      dispatch(hasErrored(err.message))
    }
  }
}