export const storeJwt = (token: string) => {
  localStorage.setItem('jwt', token);
};

export const deleteJwt = () => {
  localStorage.removeItem('jwt');
};
