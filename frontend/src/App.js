import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import MainNavigation from './shared/components/Navigation/MainNavigation';
import Leagues from './leagues/pages/Leagues';
import Brazil from './leagues/pages/Brazil';
import England from './leagues/pages/England';
import Italy from './leagues/pages/Italy';
import France from './leagues/pages/France';
import Netherlands from './leagues/pages/Netherlands';
import Spain from './leagues/pages/Spain';
import Portugal from './leagues/pages/Portugal';
import Auth from './user/pages/Auth';
import NotFound from './leagues/pages/NotFound';
import SignUp from './user/pages/SignUp';
import AuthContext from './shared/context/auth-context';
import SearchBar from './shared/components/Navigation/SearchBar';

const App = () => {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = () => {
    setIsLoggedIn(true);
  };

  const logout = () => {
    setIsLoggedIn(false);
  };

  let routes;

  if (isLoggedIn) {
    routes = (
      <Routes>
        <Route path='/' element={<Leagues />} />
        <Route path='/leagues' element={<Leagues />} />
        <Route path='/search' element={<Leagues />} /> 
        <Route path='/brazil/brazilian-a-series' element={<Brazil />}></Route>
        <Route path='/england/premier-league' element={<England />}></Route>
        <Route path='/italy/seria-a' element={<Italy />}></Route>
        <Route path='/france/ligue-1' element={<France />}></Route>
        <Route path='/netherlands/eredivisie' element={<Netherlands />}></Route>
        <Route path='/spain/primera-division' element={<Spain />}></Route>
        <Route path='/portugal/primeira-liga' element={<Portugal />}></Route>
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
        <Route path='/brazil/brazilian-a-series' element={<Brazil />}></Route>
        <Route path='/england/premier-league' element={<England />}></Route>
        <Route path='/italy/seria-a' element={<Italy />}></Route>
        <Route path='/france/ligue-1' element={<France />}></Route>
        <Route path='/netherlands/eredivisie' element={<Netherlands />}></Route>
        <Route path='/spain/primera-division' element={<Spain />}></Route>
        <Route path='/portugal/primeira-liga' element={<Portugal />}></Route>
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
