import React, { useState, useEffect } from 'react';
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
import SignUp from './user/pages/SignUp';
import AuthContext from './shared/context/auth-context';
import ClubDetail from './clubs/components/ClubDetails';
import Clubs from './clubs/pages/Clubs';
import SearchBar from './shared/components/Navigation/SearchBar';
import League from './leagues/components/League';

import { leagues } from './leagues/pages/Leagues';

const App = () => {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');

    if(storedToken) {
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

  routes = (
    <Routes>
      <Route path='/' element={<Leagues />} />
      <Route path='/leagues' element={<Leagues />} />
      <Route path='/search' element={<Leagues />} /> 
      <Route path='/login' element={<Auth />} />
      <Route path='/register' element={<SignUp />} />
      {/*<Route path='/brazil/brazilian-a-series' element={<Brazil/>} />
      <Route path='/england/premier-league' element={<England />}></Route>
      <Route path='/italy/seria-a' element={<Italy />}></Route>
      <Route path='/france/ligue-1' element={<France />}></Route>
      <Route path='/netherlands/eredivisie' element={<Netherlands />}></Route>
      <Route path='/spain/primera-division' element={<Spain />}></Route>
      <Route path='/portugal/primeira-liga' element={<Portugal />}></Route>*/}
      <Route path='/:country/:league' element={<League leagues={leagues} />} />
      {/*leagues.map((league) => (
              <Route
                key={league.id}
                path={`/${league.name}/${league.title}`}
                element={<League leagues={leagues} />}
              />
        ))*/}
      <Route path='/:country/:league/:club' element={<Clubs />} />
      {/*
       {leagues.map((league) =>
        league.clubs.map((club) => (
          <Route
            key={`${league.name}-${club}`} // Create a unique key for each route
            path={`/${league.name}/${league.title}/${club}`}
            element={<ClubDetail country={league.name} league={league.title} club={club} />}
          />
        ))
      )}s*/ }
      <Route path='*' element={<Navigate to='/' />} />
    </Routes>
  );

  /*if (isLoggedIn) {
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
  } else {*/
    
  //}

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