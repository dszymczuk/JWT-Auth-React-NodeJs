import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useNavigate } from 'react-router-dom';
import { loginRoute } from '../consts/routes';
import { useAuth } from '../context/auth';
import LogoutIcon from '@mui/icons-material/Logout';
import logo from './../images/logo.png';

const MenuBar = () => {
  let {
    user: { username },
    signOut
  } = useAuth();
  const navigate = useNavigate();

  const onLogoutClick = async () => {
    try {
      await signOut();
      navigate(loginRoute);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography variant="h6" noWrap component="div" sx={{ mr: 2 }}>
            <img src={logo} alt="logo" style={{ width: 50 }} />
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }} data-test-id="logged-user-info">
            <p>Welcome: {username}</p>
            <LogoutIcon sx={{ ml: 2, cursor: 'pointer' }} onClick={onLogoutClick} />
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default MenuBar;
