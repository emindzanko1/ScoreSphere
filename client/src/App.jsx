import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from '../components/Header';
import './App.css';
import Home from '../components/Home';
import AuthForm from '../components/Auth';

function App() {
  return (
    <>
      <Header />
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/auth' element={<AuthForm isRegister={false} />} />
          <Route path='/search' element={<AuthForm isRegister={true} />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
