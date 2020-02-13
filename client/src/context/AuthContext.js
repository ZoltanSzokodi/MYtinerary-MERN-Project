import React, { createContext, useReducer } from 'react';
import authReducer from './reducers/authReducer';

export const authContext = createContext();

const AuthContext = ({ children }) => {
  /*
  const initialState = {
    isAuthenticated: false,
    user: null,
    token: null
  };
  */

  // first we check if there is a token & user in the local storage
  // note: localStorage.hasOwnProperty(key) will return true or false
  // note: localStorage.getItem(key) will return the value or null
  const initialState = {
    isAuthenticated: localStorage.hasOwnProperty('token'),
    user: JSON.parse(localStorage.getItem('user')),
    token: JSON.parse(localStorage.getItem('token'))
  };
  const [state, dispatch] = useReducer(authReducer, initialState);

  return (
    <authContext.Provider value={{ state, dispatch }}>
      {children}
    </authContext.Provider>
  );
};

export default AuthContext;
