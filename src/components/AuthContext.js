import React, { createContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));
const [count,setCount]=useState();
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);
  const logIn = (token,id) => {
    localStorage.setItem('token', token);
    localStorage.setItem('id', id);
    console.log(id)
    setIsLoggedIn(true);
  };

  const logOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('otpToken');
    localStorage.removeItem('email');
    localStorage.removeItem('id');
    setIsLoggedIn(false);
  };

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem('token'));
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, logIn, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
