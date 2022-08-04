import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Avatar from '@mui/material/Avatar';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import * as React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { dashboardRoute, loginRoute } from '../consts/routes';
import { useAuth } from '../context/auth';

const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const auth = useAuth();

  const [hasError, setError] = useState(false);

  useEffect(() => {
    if (auth.user && location.pathname === loginRoute) {
      navigate(dashboardRoute, { replace: true });
    }
  }, [auth.user, location.pathname, navigate]);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: ''
    },
    onSubmit: async (values) => {
      setError(false);
      try {
        // setLoading(true);
        const { username, password } = values;
        await auth.signIn(username, password);
      } catch (err) {
        console.log(err.name);
        console.log(err.message);
        setError(true);
      } finally {
        // setLoading(false);
      }
    },
    validationSchema: Yup.object().shape({
      password: Yup.string().min(8, 'Too Short!').required('Required'),
      username: Yup.string().required('Required')
    })
  });

  return (
    <Box
      sx={{
        marginTop: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}
    >
      <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Sign in
      </Typography>
      <Box component="form" onSubmit={formik.handleSubmit} noValidate sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="username"
          label="Username"
          name="username"
          value={formik.values.username}
          onChange={formik.handleChange}
          error={formik.touched.username && Boolean(formik.errors.username)}
          helperText={formik.touched.username && formik.errors.username}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
        />
        <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
          Sign In
        </Button>
        {hasError && <Alert severity="error">Wrong username or password.</Alert>}
      </Box>
    </Box>
  );
};

export default LoginPage;
