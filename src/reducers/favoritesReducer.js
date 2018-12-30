export const favoritesReducer = (state = [], action) => {
  switch (action.type) {
    case 'REMOVE_FAVORITES':
      return [];
    case 'RETRIEVE_ALL_FAVORITES':
      return action.favorites;
    default:
      return state;
  }
};
