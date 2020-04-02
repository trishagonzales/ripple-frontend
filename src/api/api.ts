import http from './http';
import { ProfileType } from '../types/types';

interface LoginInput {
  email: string;
  password: string;
}

interface SignupInput extends LoginInput {
  firstName: string;
  lastName: string;
}

//  AUTH

export const login = (values: LoginInput) => {
  return http({ method: 'POST', url: '/auth', data: values });
};

export const validatePassword = (password: string) => {
  return http({ method: 'POST', url: '/users/validate-password', data: password });
};

//  USERS

export const signup = (values: SignupInput) => {
  return http({ method: 'POST', url: '/users', data: values });
};

export const getUserData = () => http('/users/me');

export const updateEmail = (email: string) => {
  return http({ method: 'PUT', url: '/users/email', data: email });
};

export const updatePassword = (password: string) => {
  return http({ method: 'PUT', url: '/users/password', data: password });
};

export const deleteUser = () => http({ method: 'DELETE', url: '/users/me' });

//  PROFILES

export const getAllProfiles = () => http('/profiles');

export const getOneProfile = (id: string) => http(`/profiles/${id}`);

export const updateProfile = (profile: ProfileType) => http({ method: 'PUT', url: '/profiles', data: profile });

//  POSTS

export const getAllPosts = () => http('/posts');

export const getOnePost = (id: string) => http(`/posts/${id}`);

export const createPost = () => {};

export const updatePost = () => {};

export const deletePost = () => {};

//  UPLOADS

export const getImage = (id: string) => {
  return http({ method: 'GET', url: `/uploads/image/${id}`, responseType: 'blob' });
};

export const updateImage = (id: string) => {
  return http({ method: 'PUT', url: `/uploads/image/${id}` });
};

export const getAvatar = (id: string) => {
  return http({ method: 'GET', url: `/uploads/avatar/${id}`, responseType: 'blob' });
};

export const updateAvatar = () => {
  return http({ method: 'PUT', url: `/uploads/avatar` });
};
