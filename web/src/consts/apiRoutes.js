export const AUTH_PATH = process.env.REACT_APP_AUTH_PATH || 'http://localhost:4000';

export const AUTH_LOGIN = `${AUTH_PATH}/user/login`;
export const AUTH_REFRESH = `${AUTH_PATH}/user/refresh`;
export const AUTH_LOGOUT = `${AUTH_PATH}/user/logout`;
export const AUTH_TEST = `${AUTH_PATH}/user/testAuth`;
