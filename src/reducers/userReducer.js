export const userReducer = (state = null, action) => {
  switch (action.type) {
    case 'LOGIN_USER':
      const newUser = { ...action.user };
      return newUser;
    case 'LOGOUT_USER':
      return null;
    default:
      return state;
  }
};
