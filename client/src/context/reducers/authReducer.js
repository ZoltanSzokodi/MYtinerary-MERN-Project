import jwt from 'jwt-decode';

const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      localStorage
        .setItem('token', JSON.stringify(action.payload));
      localStorage
        .setItem('user', JSON.stringify(jwt(action.payload)));
      return {
        ...state,
        isAuthenticated: true,
        user: jwt(action.payload),
        token: action.payload
      };
    case 'LOGOUT':
      localStorage.clear();
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        token: null
      };
    default:
      return state;
  }
};

export default authReducer;