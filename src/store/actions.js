import { createActions, createAction } from 'redux-actions';
import {
  registrationUserRequest,
  authentificationUserRequest,
  currentUserRequest,
} from '../services/services';
import {
  setUserToken, createUserErrorMessage, authentificationUserErrorMessage,
} from '../utils/helpers';

// export const { logInUserRequest, logInUserSuccess, logInUserFailure } = createActions(
//   'LOGIN_USER_REQUEST',
//   {
//     LOGIN_USER_SUCCESS: (response) => ({ response }),
//     LOGIN_USER_FAILURE: (response) => ({ response }),
//   },
// );

export const logInUserRequest = () => ({ type: 'LOGIN_USER_REQUEST' });
export const logInUserSuccess = (response) => ({
  type: 'LOGIN_USER_SUCCESS',
  response,
});
export const logInUserFailure = (response) => ({
  type: 'LOGIN_USER_FAILURE',
  response,
});

// export const { createUserRequest, createUserSuccess, createUserFailure } = createActions(
//   'CREATE_USER_REQUEST',
//   {
//     CREATE_USER_SUCCESS: (response) => ({ response }),
//     CREATE_USER_FAILURE: (response) => ({ response }),
//   },
// );

export const createUserRequest = () => ({ type: 'CREATE_USER_REQUEST' });
export const createUserSuccess = (response) => ({
  type: 'CREATE_USER_SUCCESS',
  response,
});
export const createUserFailure = (response) => ({
  type: 'CREATE_USER_FAILURE',
  response,
});

// export const { checkCurrentUserRequest, checkCurrentUserSuccess, checkCurrentUserFailure } = createActions(
//   'CHECK_USER_REQUEST',
//   {
//     CHECK_USER_SUCCESS: (response) => ({ response }),
//     CHECK_USER_FAILURE: (response) => ({ response }),
//   },
// );

export const checkCurrentUserRequest = () => ({ type: 'CHECK_USER_REQUEST' });
export const checkCurrentUserSuccess = (response) => ({
  type: 'CHECK_USER_SUCCESS',
  response,
});
export const checkCurrentUserFailure = (response) => ({
  type: 'CHECK_USER_FAILURE',
  response,
});

// export const logOutUser = createAction('LOGOUT_USER');

export const logOutUser = () => ({ type: 'LOGOUT_USER' });

export const createUser = (value) => async (dispatch) => {
  dispatch(createUserRequest());
  try {
    const response = await registrationUserRequest(value);
    dispatch(createUserSuccess(response));
    setUserToken(response.data.user.token);
  } catch (error) {
    dispatch(createUserFailure(error));
    createUserErrorMessage(error);
  }
};

export const authentificationUser = (value) => async (dispatch) => {
  dispatch(logInUserRequest());
  try {
    const response = await authentificationUserRequest(value);
    dispatch(logInUserSuccess(response));
    setUserToken(response.data.user.token);
  } catch (error) {
    dispatch(logInUserFailure(error));
    authentificationUserErrorMessage(error);
  }
};

export const currentUser = (value) => async (dispatch) => {
  dispatch(checkCurrentUserRequest());
  try {
    const response = await currentUserRequest(value);
    dispatch(checkCurrentUserSuccess(response));
    setUserToken(response.data.user.token);
  } catch (error) {
    dispatch(checkCurrentUserFailure(error));
  }
};
