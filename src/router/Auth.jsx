import { useState } from 'react';
import { Navigate } from 'react-router-dom';

export const UseAuth = () => {
  const [auth, setAuth] = useState(localStorage.getItem('authToken') ? true : false);

  const login = (token) => {
    localStorage.setItem('authToken', token); // simulate login
    setAuth(true);
  };

  const logout = () => {
    localStorage.removeItem('authToken'); // simulate logout
    setAuth(false);
  };

  return { auth, login, logout };
};

export const AuthToken = () => {
  var token = localStorage.getItem('authToken')
  return token
}

// ProtectedRoute component to protect routes that need authentication
export const ProtectedRoute = ({ children }) => {
  const { auth } = UseAuth();

  if (!auth) {
    // Redirect to login if not authenticated
    return <Navigate to="/login" />;
  }

  return children;
};


