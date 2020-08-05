import axios from 'axios';
import {
  registrationUserPath,
  authenticationUserPath,
  pathAPI,
  currentUserPath,
  listArticlesPath,
  getArticlesPath,
  favoriteArticlesPath,
} from './path';

import { getUserToken } from '../utils/helpers';

axios.interceptors.request.use((config) => {
  const token = getUserToken();
  if (token !== null) { config.headers.Authorization = `Token ${token}`; }
  return config;
});

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
  const requestParameters = {
    url: currentUserPath,
    method: 'get',
    baseURL: pathAPI,
  };
  return axios(requestParameters);
};

export const listArticlesRequest = (offset = 0, limit = 10) => {
  const requestParameters = {
    url: listArticlesPath,
    method: 'get',
    baseURL: pathAPI,
    params: {
      limit,
      offset,
    },
  };
  return axios(requestParameters);
};

export const newArticleRequest = (value) => {
  const requestParameters = {
    url: listArticlesPath,
    method: 'post',
    baseURL: pathAPI,
    data: value,
  };
  return axios(requestParameters);
};

export const getArticleRequest = (slug) => {
  const requestParameters = {
    url: getArticlesPath(slug),
    method: 'get',
    baseURL: pathAPI,
  };
  return axios(requestParameters);
};

export const getArticleViewerRequest = (slug) => {
  const requestParameters = {
    url: getArticlesPath(slug),
    method: 'get',
    baseURL: pathAPI,
  };
  return axios(requestParameters);
};

export const updateArticleRequest = (slug, value) => {
  const requestParameters = {
    url: getArticlesPath(slug),
    method: 'put',
    baseURL: pathAPI,
    data: value,
  };
  return axios(requestParameters);
};

export const deleteArticleRequest = (slug) => {
  const requestParameters = {
    url: getArticlesPath(slug),
    method: 'delete',
    baseURL: pathAPI,
  };
  return axios(requestParameters);
};

export const favoriteArticleRequest = (slug) => {
  const requestParameters = {
    url: favoriteArticlesPath(slug),
    method: 'post',
    baseURL: pathAPI,
  };
  return axios(requestParameters);
};

export const unfavoriteArticleRequest = (slug) => {
  const requestParameters = {
    url: favoriteArticlesPath(slug),
    method: 'delete',
    baseURL: pathAPI,
  };
  return axios(requestParameters);
};
