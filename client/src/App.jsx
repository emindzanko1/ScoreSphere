import { BrowserRouter as Router, Routes, Route, createBrowserRouter, RouterProvider } from 'react-router-dom';
import Header from '../components/Header';
import './App.css';
import Home from '../components/Home';
import AuthForm from '../components/Auth';
import Footer from '../components/Footer';
import RootLayout from '../pages/Root';
import Error from '../pages/Error';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <Error />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/auth', element: <AuthForm /> },
    ],
  },
]);

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
