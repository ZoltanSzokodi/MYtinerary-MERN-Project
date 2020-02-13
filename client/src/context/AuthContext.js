import React, { createContext, useReducer } from 'react';
import authReducer from './reducers/authReducer';

export const authContext = createContext();

const AuthContext = ({ children }) => {
  const initialState = {
    isAuthenticated: false,
    user: null,
    token: null
  };
  const [state, dispatch] = useReducer(authReducer, initialState);

  return (
    <authContext.Provider value={{ state, dispatch }}>
      {children}
    </authContext.Provider>
  );
};

export default AuthContext;
