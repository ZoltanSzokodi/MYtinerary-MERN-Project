import React, { createContext, useReducer } from 'react';
import authReducer from './reducers/authReducer';

export const authContext = createContext();


// CONTEXT WRAPPER COMPONENT ===========================================
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
  const [authState, authDispatch] = useReducer(authReducer, initialState);
  // console.log(authState)

  // RENDER =======================================================
  return (
    <authContext.Provider value={{ authState, authDispatch }}>
      {children}
    </authContext.Provider>
  );
};

export default AuthContext;
