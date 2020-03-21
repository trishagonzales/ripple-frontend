// import { AxiosError } from 'axios';
import { useToasts } from 'react-toast-notifications';

const useAPIError = () => {
  const { addToast } = useToasts();

  const onError = (e: any) => {
    if (
      e.response &&
      e.response.status < 500 &&
      (e.response.headers['Content-Type'] === 'text/html' || e.response.headers['Content-Type'] === 'application/json')
    ) {
      addToast(e.response.data, { appearance: 'error' });
    } else {
      addToast('Unexpected error occurred.', { appearance: 'error' });
    }
  };

  return onError;
};

export default useAPIError;
