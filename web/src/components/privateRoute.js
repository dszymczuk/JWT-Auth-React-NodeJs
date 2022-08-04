import { Box } from '@mui/material';
import Container from '@mui/material/Container';
import * as React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { loginRoute } from '../consts/routes';
import { useAuth } from '../context/auth';
import MenuBar from './menuBar';

const PrivateRoute = ({ children }) => {
  const auth = useAuth();
  const location = useLocation();

  // if (auth.user === null) {
  //   return <></>
  // }

  if (auth.user === null || !auth.user) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to={loginRoute} state={{ from: location }} replace />;
  }

  return (
    <>
      <Box mb={4}>
        <MenuBar />
      </Box>
      <Container maxWidth="sm">{children}</Container>
    </>
  );
};

export default PrivateRoute;
