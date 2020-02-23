import axios from 'axios';

import {
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS
} from './types';

// Check token & load user
export const loadUser = path => (dispatch, getState) => {
  return new Promise((resolve, reject) => {
    dispatch({ type: USER_LOADING });

    axios
      .get('/api/auth/user', tokenConfig(getState))
      .then(res => {
        dispatch({
          type: USER_LOADED,
          payload: res.data
        });
        resolve(path);
      })
      .catch(err => {
        dispatch({
          type: AUTH_ERROR
        });

        const routes = ['/register', '/welcome', '/login', '/forgot-password'];

        for (let i = 0; i < routes.length; i++) {
          if (routes[i] == path) {
            return resolve(path);
          }
        }

        return resolve('/welcome');
      });
  });
};

// Register User
export const register = body => dispatch => {
  return new Promise((resolve, reject) => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    axios
      .post('/api/auth/users', body, config)
      .then(res => {
        dispatch({
          type: REGISTER_SUCCESS,
          payload: res.data
        });

        resolve('/');
      })
      .catch(err => {
        console.log(err.response.data);
        reject(err.response.data.msg);
      });
  });
};

// Login User
export const login = body => dispatch => {
  return new Promise((resolve, reject) => {
    // Headers
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    // console.log(body);

    axios
      .post('/api/auth/login', body, config)
      .then(res => {
        dispatch({
          type: LOGIN_SUCCESS,
          payload: res.data
        });
        resolve();
      })
      .catch(err => {
        reject(err.response.data.msg);
      });
  });
};

// Logout User
export const logout = redirect => dispatch => {
  dispatch({
    type: LOGOUT_SUCCESS
  });
  redirect();
};

// Setup config/headers and token
export const tokenConfig = getState => {
  // Get token from localstorage
  const token = getState().auth.token;

  // Headers
  const config = {
    headers: {
      'Content-type': 'application/json'
    }
  };

  // If token, add to headers
  if (token) {
    config.headers['x-auth-token'] = token;
  }

  return config;
};
