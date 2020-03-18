import { useState, useEffect } from 'react';
// import { useToasts } from 'react-toast-notifications';
import useAPIError from './useAPIError';
import http from '../api/http.api';

export default function useFetch<T>(params: any) {
  const [data, setData] = useState<T>();
  const [isLoading, setLoading] = useState(false);
  const onError = useAPIError();
  // const { addToast } = useToasts();

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const { data } = await http(params);
        setData(data);
      } catch (e) {
        onError(e);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return { data, setData, isLoading };
}
