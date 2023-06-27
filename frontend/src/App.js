import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes, Switch } from 'react-router-dom';
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

const App = () => {
  const [isValidPage, setIsValidPage] = useState(true);

  let routes;

  routes = (
    <Routes>
      <Route path='/' element={<Leagues />} />
      <Route path='/login' element={<Auth />} />
      <Route path='/register' element={<SignUp />} />
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

/*const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<MainNavigation />} exact/>
      </Routes>
    </Router>
  );
};*/

/*const App = () => {
  return (
    <React.Fragment>
      <Router>
        <Routes>
          <Route path='/'>
            <Leagues />
          </Route>
        </Routes>
        {/*  <Navigate to='/' /> */ //}
/*  </Router>
    </React.Fragment>
  );
};*/

//1. korak za pocetak cemo poslati glavnoj navigaciji 12 kartica ajde prosto

//naslov ce biti dinamicki
