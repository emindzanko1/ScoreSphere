import React, { useState, useEffect, useCallback } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import MainNavigation from './shared/components/Navigation/MainNavigation';
import Leagues from './leagues/pages/Leagues';
import Auth from './user/pages/Auth';
import AuthContext from './shared/context/auth-context';
import Clubs from './clubs/pages/Clubs';
import League from './leagues/components/League';

const App = () => {
  const [token, setToken] = useState(false);
  const [userId, setUserId] = useState(false);

  // useEffect(() => {
  //   const storedToken = localStorage.getItem('token');

  //   if (storedToken) {
  //     setIsLoggedIn(true);
  //   }
  // }, []);

  const login = useCallback((uid, token) => {
    setToken(token);
    setUserId(uid);
    localStorage.setItem('token', 'your_auth_token_here');
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setUserId(null);
    localStorage.removeItem('token');
  },[]);


  let routes;

  if (token) {
    routes = (
      <Routes>
        <Route path='/' element={<Leagues />} />
        <Route path='/search' element={<Leagues />} />
        <Route path='tournament/:country/:league' element={<League />} />
        <Route path='/team/:club' element={<Clubs />} />
        <Route path='*' element={<Navigate to='/' />} />
      </Routes>
    );
  } else {
    routes = (
      <Routes>
        <Route path='/' element={<Leagues />} />
        <Route path='/search' element={<Leagues />} />
        <Route path='/auth' element={<Auth />} />
        <Route path='tournament/:country/:league' element={<League/>} />
        <Route path='/team/:club' element={<Clubs />} />
        <Route path='*' element={<Navigate to='/' />} />
      </Routes>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        token: token,
        userId: userId,
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
