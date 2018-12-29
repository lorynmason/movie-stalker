export const userReducer = (state = null, action) => {
  switch (action.type) {
    case 'LOGIN_USER':
      console.log(action);
      const newUser = { ...action.user };
      return newUser;
    case 'LOGOUT_USER':
      return null;
    default:
      return state;
  }
};
