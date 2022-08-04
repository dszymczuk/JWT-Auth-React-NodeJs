import Button from '@mui/material/Button';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/auth';

const LogoutButton = () => {
  const auth = useAuth();
  const navigate = useNavigate();

  if (!auth.user) {
    return null;
  }

  return (
    <Button
      variant="contained"
      onClick={() => {
        auth.signout(() => navigate('/'));
      }}
    >
      Sign out
    </Button>
  );
};

export default LogoutButton;
