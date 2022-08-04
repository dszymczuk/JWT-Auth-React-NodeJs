import { useEffect } from 'react';
import * as React from 'react';
import { AUTH_LOGIN, AUTH_LOGOUT } from '../consts/apiRoutes';
import { getJsonFromLocalStorage, setJsonToLocalStorage } from '../utils/localStorage';
import axios from './../utils/axios';

const AuthContext = React.createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = React.useState(null);

  useEffect(() => {
    const localUser = getJsonFromLocalStorage('user');
    if (localUser) {
      setJsonToLocalStorage('user', localUser);
      setUser(localUser);
    }
  }, []);

  useEffect(() => {
    function checkUserData() {
      const localUser = getJsonFromLocalStorage('user');
      if (localUser) {
        setUser(localUser);
      }
    }

    window.addEventListener('storage', checkUserData);

    return () => {
      window.removeEventListener('storage', checkUserData);
    };
  }, []);

  const signIn = async (userName, password) => {
    try {
      const {
        data: { username, isAdmin, refreshToken, accessToken }
      } = await axios.post(AUTH_LOGIN, { username: userName, password });
      setUser({ username, isAdmin });
      setJsonToLocalStorage('token', {
        accessToken,
        refreshToken
      });
      setJsonToLocalStorage('user', {
        username: userName,
        isAdmin
      });
    } catch (err) {
      console.log(err);
      throw err;
    }
  };

  const signOut = async () => {
    try {
      const { refreshToken } = getJsonFromLocalStorage('token');

      await axios.post(AUTH_LOGOUT, { token: refreshToken });
    } catch (err) {
      console.log(err);
    } finally {
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      setUser(null);
    }
  };

  const value = { user, signIn, signOut };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => React.useContext(AuthContext);
