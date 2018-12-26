export const favoritesReducer = (state = [], action) => {
  switch (action.type) {
    case 'ADD_FAVORITE':
      console.log(action);
      return [...state, action.movie];
    case 'REMOVE_FAVORITE':
      break;
    case 'RETRIEVE_ALL_FAVORITES':
      break;
    default:
      return state;
  }
};
