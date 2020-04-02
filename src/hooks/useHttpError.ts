import { useCallback } from 'react';
import { AxiosError } from 'axios';
import { useToasts } from 'react-toast-notifications';

const useHttpError = () => {
  const { addToast } = useToasts();

  const onError = useCallback(
    (e: AxiosError) => {
      if (e.response && e.response.config.responseType !== 'blob' && e.response.status < 500) {
        addToast(e.response.data, { appearance: 'error' });
      } else if (e.response?.config.responseType === 'blob') {
        return;
      } else {
        addToast('Unexpected error occurred.', { appearance: 'error' });
      }
    },
    [addToast]
  );

  return onError;
};

export default useHttpError;
