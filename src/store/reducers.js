import { combineReducers } from 'redux';

const newUser = (state = 0, action) => {
  const { type, response } = action;
  switch (type) {
    case 'CREATE_USER_REQUEST':
      return state;
    case 'CREATE_USER_FAILURE':
      return { error: response };
    case 'CREATE_USER_SUCCESS':
      return 0;
    default:
      return state;
  }
};

const authenticationUser = (state = 0, action) => {
  const { type, response } = action;
  switch (type) {
    case 'LOGIN_USER_REQUEST':
      return state;
    case 'LOGIN_USER_FAILURE':
      return { error: response };
    case 'LOGIN_USER_SUCCESS':
      return 0;
    default:
      return state;
  }
};

const currentUser = (state = 0, action) => {
  const { type, response } = action;
  switch (type) {
    case 'CHECK_USER_REQUEST':
      return state;
    case 'CHECK_USER_SUCCESS':
      return response.data.user;
    case 'CHECK_USER_FAILURE':
      return { error: response };
    case 'LOGIN_USER_SUCCESS':

      return response.data.user;
    case 'LOGOUT_USER':

      return 0;
    case 'CREATE_USER_SUCCESS':
      return response.data.user;
    default:
      return state;
  }
};

export default combineReducers({ newUser, authenticationUser, currentUser });
