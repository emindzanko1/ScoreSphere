import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainNavigation from './shared/components/Navigation/MainNavigation';
import Leagues from './leagues/pages/Leagues';
import Brazil from './leagues/pages/Brazil';
import England from './leagues/pages/England';
import Italy  from './leagues/pages/Italy';
import France from './leagues/pages/France';
import Netherlands from './leagues/pages/Netherlands';
import Spain from './leagues/pages/Spain';
import Portugal from './leagues/pages/Portugal';
import Auth from './user/pages/Auth';
import NotFound from './leagues/pages/NotFound';
import SignUp from './user/pages/SignUp';
import Search from './page/components/Search';

const App = () => {

  let routes;

  routes = (
    <Routes>
      <Route path='/' element={<Leagues />} />
      <Route path='/login' element={<Auth />} />
      <Route path='/register' element={<SignUp />} />
      <Route path='/search' element={<Search />} />
      <Route path='/brazil/brazilian-a-series' element={<Brazil />}></Route>
      <Route path='/england/premier-league' element={<England />}></Route>
      <Route path='/italy/seria-a' element={<Italy />}></Route>
      <Route path='/france/ligue-1' element={<France />}></Route>
      <Route path='/netherlands/eredivisie' element={<Netherlands />}></Route>
      <Route path='/spain/primera-division' element={<Spain />}></Route>
      <Route path='/portugal/primeira-liga' element={<Portugal />}></Route>
      <Route path='*' element={<NotFound />} />
    </Routes>
  );

  return (
    <Router>
      <MainNavigation />
      <main>{routes}</main>
    </Router>
  );
};

export default App;

