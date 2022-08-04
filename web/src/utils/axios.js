import axios from 'axios';
import { AUTH_REFRESH } from '../consts/apiRoutes';
import { loginRoute } from '../consts/routes';
import { getJsonFromLocalStorage, setJsonToLocalStorage } from './localStorage';

const axiosInstance = axios.create({
  headers: {
    'Content-Type': 'application/json'
  }
});

const onRequest = (config) => {
  if (!config.url.includes(loginRoute)) {
    const token = getJsonFromLocalStorage('token');
    if (token && token.accessToken) {
      config.headers['Authorization'] = `Bearer ${token.accessToken}`;
    }
  }

  return config;
};

const onRequestError = (error) => {
  return Promise.reject(error);
};

const onResponse = (response) => {
  return response;
};

const onResponseError = async (error) => {
  const originalRequest = error.config;

  if (error.response) {
    // Access Token was expired
    if ((error.response.status === 401 || error.response.status === 403) && !originalRequest._retry) {
      const storedToken = getJsonFromLocalStorage('token');
      originalRequest._retry = true;

      try {
        const rs = await axios.post(AUTH_REFRESH, {
          token: storedToken.refreshToken
        });

        const { username, isAdmin, refreshToken, accessToken } = rs.data;

        setJsonToLocalStorage('token', {
          accessToken,
          refreshToken
        });
        setJsonToLocalStorage('user', {
          username,
          isAdmin
        });

        return axiosInstance(originalRequest);
      } catch (_error) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.replace(loginRoute);
        return Promise.reject(_error);
      }
    }
  }
  return Promise.reject(error);
};

const setupInterceptorsTo = (axiosInstance) => {
  axiosInstance.interceptors.request.use(onRequest, onRequestError);
  axiosInstance.interceptors.response.use(onResponse, onResponseError);
  return axiosInstance;
};

export default setupInterceptorsTo(axiosInstance);
