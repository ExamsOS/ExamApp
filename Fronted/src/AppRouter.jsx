import React, { useState } from 'react';
import Login from './Login';
import MCQTest from './MCQTest';

const AppRouter = () => {
  const [user, setUser] = useState(null);

  const handleLogin = (username) => {
    setUser(username);
  };

  const handleLogout = () => {
    setUser(null);
  };

  return user ? <MCQTest onLogout={handleLogout} /> : <Login onLogin={handleLogin} />;
};

export default AppRouter;
