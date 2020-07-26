import axios from 'axios';
import {
  registrationUserPath,
  authenticationUserPath,
  pathAPI,
  currentUserPath,
  listArticlesPath,
  getArticlesPath,
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

export const currentUserRequest = () => {
  const token = getUserToken();
  const requestParameters = {
    url: currentUserPath,
    method: 'get',
    baseURL: pathAPI,
    headers: { Authorization: `Token ${token}` },
  };
  return axios(requestParameters);
};

export const listArticlesRequest = () => {
  const requestParameters = {
    url: listArticlesPath,
    method: 'get',
    baseURL: pathAPI,

  };
  return axios(requestParameters);
};

export const newArticleRequest = (value) => {
  const token = getUserToken();
  const requestParameters = {
    url: listArticlesPath,
    method: 'post',
    baseURL: pathAPI,
    headers: { Authorization: `Token ${token}` },
    data: value,
  };
  return axios(requestParameters);
};

export const getArticleRequest = (slug) => {
  const token = getUserToken();
  const requestParameters = {
    url: getArticlesPath(slug),
    method: 'get',
    baseURL: pathAPI,
    headers: { Authorization: `Token ${token}` },
  };
  return axios(requestParameters);
};

export const updateArticleRequest = (slug, value) => {
  const token = getUserToken();
  const requestParameters = {
    url: getArticlesPath(slug),
    method: 'put',
    baseURL: pathAPI,
    headers: { Authorization: `Token ${token}` },
    data: value,
  };
  return axios(requestParameters);
};
