import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import useGlobal from './useGlobal';

const useRequireAuth = (redirectURL = '/login') => {
  const { user } = useGlobal();
  let history = useHistory();

  useEffect(() => {
    if (!user) history.push(redirectURL);
  }, [user, redirectURL, history]);

  return user ? true : false;
};

export default useRequireAuth;
