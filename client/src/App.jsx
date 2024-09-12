import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import Home from '../components/Home';
import RootLayout from '../pages/Root';
import Error from '../pages/Error';
import LeagueDetail from '../pages/LeagueDetail';
import TeamDetail from '../pages/TeamDetail';
import AuthPage, { action as authAction } from '../pages/AuthPage';
import Favorite from '../pages/Favorite';
import { action as logoutAction } from '../pages/Logout';
import { tokenLoader } from '../util/auth';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <Error />,
    id: 'root',
    loader: tokenLoader,
    children: [
      { index: true, element: <Home /> },
      { path: '/auth', element: <AuthPage />, action: authAction },
      { path: '/league/:leagueId', element: <LeagueDetail /> },
      { path: '/team/:teamId', element: <TeamDetail /> },
      { path: '/favorites', element: <Favorite /> },
      { path: '/logout', action: logoutAction },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
