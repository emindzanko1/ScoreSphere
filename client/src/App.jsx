import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import Home from '../components/Home';
import AuthForm from '../components/Auth';
import RootLayout from '../pages/Root';
import Error from '../pages/Error';
import LeagueDetail from '../pages/LeagueDetail';
import ClubDetail from '../pages/ClubDetail';
import AuthPage from '../pages/AuthPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <Error />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/auth', element: <AuthForm /> },
      { path: '/league/:leagueId', element: <LeagueDetail /> },
      { path: '/club/:clubId', element: <ClubDetail /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
