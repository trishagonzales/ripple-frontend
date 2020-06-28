import http from './http';
import { AxiosPromise } from 'axios';
import { ProfileType, PostType } from '../types';

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
  return http({ method: 'POST', url: '/users/validate-password', data: { password } });
};

//  USERS

export const signup = (values: SignupInput) => {
  return http({ method: 'POST', url: '/users', data: values });
};
export const getUserData = () => http('/users/me');
export const updateEmail = (email: string) => {
  return http({ method: 'PUT', url: '/users/email', data: { email } });
};
export const updatePassword = (password: string) => {
  return http({ method: 'PUT', url: '/users/password', data: { password } });
};
export const deleteAccount = () => http({ method: 'DELETE', url: '/users/me' });

//  PROFILES

export const getAllProfiles = () => http('/profiles');
export const getOneProfile = (id: string) => http(`/profiles/${id}`);
export const updateProfile = (profile: ProfileType) =>
  http({ method: 'PUT', url: '/profiles', data: profile });

//  POSTS

export const getAllPosts = () => http('/posts');
export const getUserPosts = (id: string) => http(`/posts/user/${id}`);
export const getOnePost = (id: string) => http(`/posts/${id}`);
export const createPost = (post: PostType): AxiosPromise<PostType> =>
  http({ method: 'POST', url: '/posts', data: post });
export const updatePost = (id: string, values: any) =>
  http({ method: 'PUT', url: `/posts/${id}`, data: values });
export const deletePost = (id: string) => http({ method: 'DELETE', url: `/posts/${id}` });
export const getLikedPosts = () => http(`/posts/liked-posts`);
export const likePost = (id: string) => http({ method: 'PUT', url: `/posts/${id}/likes` });
export const unlikePost = (id: string) => http({ method: 'PUT', url: `/posts/${id}/unlikes` });

//  UPLOADS

export const getImage = (id: string) => {
  return http({ method: 'GET', url: `/uploads/image/${id}`, responseType: 'blob' });
};

export const updateImage = (id: string, file: Blob) => {
  const form = new FormData();
  form.append('image', file);

  return http({
    method: 'PUT',
    url: `/uploads/image/${id}`,
    data: form,
    headers: { 'content-type': 'multipart/form-data' },
  });
};

export const getAvatar = (id: string) => {
  return http({ method: 'GET', url: `/uploads/avatar/${id}`, responseType: 'blob' });
};

export const updateAvatar = (file: Blob) => {
  const form = new FormData();
  form.append('avatar', file);

  return http({
    method: 'PUT',
    url: '/uploads/avatar',
    data: form,
    headers: { 'content-type': 'multipart/form-data' },
  });
};
