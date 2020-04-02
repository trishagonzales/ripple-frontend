import { useContext } from 'react';
import { GlobalContext } from '../providers';

const useGlobal = () => {
  const {
    global: { user },
    dispatch
  } = useContext(GlobalContext);

  return { global, user, dispatch };
};

export default useGlobal;
