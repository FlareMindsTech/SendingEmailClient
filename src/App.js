import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

import PrivateRoute from './utils/PrivateRoute';
import Login from './Components/login';
import Dashboard from './Components/Dashboard';

function App() {
  // Load auth state from localStorage first
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('isAuthenticated') === 'true';
  });

  // Login handler
  const handleLogin = () => {
    setIsAuthenticated(true);
    localStorage.setItem('isAuthenticated', 'true');
  };

  // Logout handler
  // const handleLogout = () => {
  //   setIsAuthenticated(false);
  //   localStorage.removeItem('isAuthenticated');
  // };

  return (
    <Routes>
      <Route path="/" element={<Login  onLogin={handleLogin} />} />
      <Route
        path="/dashboard/*"
        element={
          <PrivateRoute isAuthenticated={isAuthenticated}>
            <Dashboard isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
          </PrivateRoute>
        }
      />
    </Routes>
  );
}

export default App;
