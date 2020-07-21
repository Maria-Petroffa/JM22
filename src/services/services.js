import axios from 'axios';
import {
  registrationUserPath,
  authenticationUserPath,
  pathAPI,
  currentUserPath,
} from './path';

import { getUserToken } from '../utils/helpers';

export const registrationUserRequest = (value) => {
  const requestParameters = {
    url: registrationUserPath,
    method: 'post',
    baseURL: pathAPI,
    data: value,
  };
  return axios(requestParameters);
};

export const authentificationUserRequest = (value) => {
  const requestParameters = {
    url: authenticationUserPath,
    method: 'post',
    baseURL: pathAPI,
    data: value,
  };

  return axios(requestParameters);
};

export const currentUserRequest = (value) => {
  const token = getUserToken();
  const requestParameters = {
    url: currentUserPath,
    method: 'get',
    baseURL: pathAPI,
    headers: { Authorization: `Token ${token}` },
  };
  return axios(requestParameters);
};
