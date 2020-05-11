import { useState, useCallback, useEffect } from 'react';
import useHttp from './useHttp';
import useModal from './useModal';
import { validatePassword } from '../api/api';

interface CallbackObject {
  call: any;
  apiFunction: any;
  values?: any;
}

const useValidatePassword = () => {
  const [callback, setCallback] = useState<CallbackObject>();
  // const [success, setSuccess] = useState(false);
  const { res, setRes, callAPI } = useHttp();
  const modal = useModal();

  const validate = useCallback(
    (password: string) => {
      callAPI({ asyncFunction: () => validatePassword(password) });
    },
    [callAPI]
  );

  const open = useCallback(
    (callback: CallbackObject) => {
      setRes(undefined);
      modal.open();
      setCallback(callback);
    },
    [setRes, setCallback, modal.open]
  );

  useEffect(() => {
    if (callback && res) {
      callback.call({ asyncFunction: callback.apiFunction, values: callback.values });
    }
  }, [res, callback]);

  useEffect(() => {
    if (res) modal.close();
  }, [res, modal.close]);

  return { validate, open, close: modal.close, isOpen: modal.isOpen };
};

export default useValidatePassword;
