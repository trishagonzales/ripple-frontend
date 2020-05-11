import { useContext } from 'react';
import { GlobalContext } from '../providers';

const useGlobal = () => {
  const {
    global: { user, navMenu },
    dispatch,
  } = useContext(GlobalContext);

  return { global, user, navMenu, dispatch };
};

export default useGlobal;
