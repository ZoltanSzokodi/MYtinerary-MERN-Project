import jwt from 'jwt-decode';
import axios from 'axios';

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
      // BACK-END LOG OUT ============================================
      axios.get('/api/users/logout',
        { headers: { 'Authorization': `bearer ${action.payload}` } })
        .then(res => console.log(res))
        .catch(err => console.log(err));

      // FRONT-END LOG OUT ===========================================
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