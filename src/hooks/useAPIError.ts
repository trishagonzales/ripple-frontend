import { AxiosError } from 'axios';
import { useToasts } from 'react-toast-notifications';

const useAPIError = () => {
  const { addToast } = useToasts();

  const onError = (e: AxiosError) => {
    return e.response &&
      (e.response.headers['Content-Type'] === 'application/json' ||
        e.response.headers['Content-Type'] === 'text/*')
      ? addToast(e.response.data, { appearance: 'error' })
      : addToast('Unexpected error occurred.', { appearance: 'error' });
  };

  return onError;
};

export default useAPIError;
