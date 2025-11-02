import React, { createContext, useReducer } from 'react';

// Initialize auth state from localStorage so user stays logged in across refresh
const initialState = {
  userInfo: localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    : null,
};

const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      localStorage.setItem('userInfo', JSON.stringify(action.payload));
      return { ...state, userInfo: action.payload };
    case 'LOGOUT':
      localStorage.removeItem('userInfo');
      return { ...state, userInfo: null };
    default:
      return state;
  }
};

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
