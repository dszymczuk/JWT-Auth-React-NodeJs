import * as React from 'react';
import { Outlet, Route, Routes } from 'react-router-dom';
import PrivateRoute from './components/privateRoute';
import { dashboardRoute } from './consts/routes';
import { AuthProvider } from './context/auth';
import DashboardPage from './views/dashboard';
import LoginPage from './views/login';

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<LoginPage />} />
          <Route
            path={dashboardRoute}
            element={
              <PrivateRoute>
                <DashboardPage />
              </PrivateRoute>
            }
          />
        </Route>
      </Routes>
    </AuthProvider>
  );
}

function Layout() {
  return (
    <div>
      {/*<AuthStatus />*/}
      <Outlet />
    </div>
  );
}
