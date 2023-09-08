import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from './App.jsx';
import Home from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Listings from './pages/Listings.jsx';

import { ThemeProvider, createTheme} from '@mui/material'

import ErrorPage from './pages/ErrorPage';

const theme = createTheme({
  palette:{
    primary: {
      main: '#216869'
    },
    secondary: {
      main: '#9CC5A1'
    }
  }
})
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: '/listings',
        element: <Listings />
      },
      {
        path: '/login',
        element: <Login />
      },
      {
        path: '/signup',
        element: <SignUp />
      },
      // {
      //   path: '/profile',
      //   element: <Profile />
      // }
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <ThemeProvider theme={theme}>
  <RouterProvider router={router} />
   </ThemeProvider> 
)
