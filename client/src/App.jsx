import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import Home from '../components/Home';
import RootLayout from '../pages/Root';
import Error from '../pages/Error';
import LeagueDetail from '../pages/LeagueDetail';
import ClubDetail from '../pages/ClubDetail';
import AuthPage, {action as authAction} from '../pages/AuthPage';
import Favorite from '../pages/Favorite';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <Error />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/auth', element: <AuthPage />, action: authAction },
      { path: '/league/:leagueId', element: <LeagueDetail /> },
      { path: '/club/:clubId', element: <ClubDetail /> },
      { path: '/favorites', element: <Favorite />}
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
