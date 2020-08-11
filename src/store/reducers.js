import { combineReducers } from 'redux';

const newUser = (state = null, action) => {
  const { type, response } = action;
  switch (type) {
    case 'CREATE_USER_REQUEST':
      return state;
    case 'CREATE_USER_FAILURE':
      return { error: response };
    case 'CREATE_USER_SUCCESS':
      return null;
    default:
      return state;
  }
};

const authenticationUser = (state = null, action) => {
  const { type, response } = action;
  switch (type) {
    case 'LOGIN_USER_REQUEST':
      return state;
    case 'LOGIN_USER_FAILURE':
      return { error: response };
    case 'LOGIN_USER_SUCCESS':
      return null;
    default:
      return state;
  }
};

const currentUser = (state = null, action) => {
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
      return null;
    case 'CREATE_USER_SUCCESS':
      return response.data.user;
    default:
      return state;
  }
};

const request = (state = false, action) => {
  const { type} = action;
  switch (type) {
    case 'CHECK_USER_REQUEST':
      return true;
    case 'LOGIN_USER_REQUEST':
      return true;
    case 'CREATE_USER_REQUEST':
      return true;
    default:
      return false;
  }
};

export default combineReducers({
  newUser, authenticationUser, currentUser, request,
});
