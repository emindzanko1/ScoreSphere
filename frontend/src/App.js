import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import MainNavigation from './shared/components/Navigation/MainNavigation';
import Leagues from './leagues/pages/Leagues';
import Auth from './user/pages/Auth';
import SignUp from './user/pages/SignUp';
import AuthContext from './shared/context/auth-context';
import Clubs from './clubs/pages/Clubs';
import League from './leagues/components/League';

import { leagues } from './leagues/pages/Leagues';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');

    if (storedToken) {
      setIsLoggedIn(true);
    }
  }, []);

  const login = () => {
    setIsLoggedIn(true);
    localStorage.setItem('token', 'your_auth_token_here');
  };

  const logout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('token');
  };


  let routes;

  if (isLoggedIn) {
    routes = (
      <Routes>
        <Route path='/' element={<Leagues />} />
        <Route path='/leagues' element={<Leagues />} />
        <Route path='/search' element={<Leagues />} />
        <Route path='/:country/:league' element={<League leagues={leagues} />} />
        <Route path='/:country/:league/:club' element={<Clubs />} />
        <Route path='*' element={<Navigate to='/' />} />
      </Routes>
    );
  } else {
    routes = (
      <Routes>
        <Route path='/' element={<Leagues />} />
        <Route path='/leagues' element={<Leagues />} />
        <Route path='/search' element={<Leagues />} />
        <Route path='/login' element={<Auth />} />
        <Route path='/register' element={<SignUp />} />
        <Route path='/:country/:league' element={<League leagues={leagues} />} />
        <Route path='/:country/:league/:club' element={<Clubs />} />
        <Route path='*' element={<Navigate to='/' />} />
      </Routes>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        login: login,
        logout: logout,
      }}
    >
      <Router>
        <MainNavigation />
        <main>{routes}</main>
      </Router>
    </AuthContext.Provider>
  );
};

export default App;
