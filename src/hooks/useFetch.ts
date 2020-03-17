import { useState, useEffect } from 'react';
import { useToasts } from 'react-toast-notifications';
import http from '../api/http.api';

export default function useFetch<T>(params: any) {
  const [data, setData] = useState<T>();
  const [isLoading, setLoading] = useState(false);
  const { addToast } = useToasts();

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const { data } = await http(params);
        setData(data);
      } catch (e) {
        return e.response &&
          (e.response.headers['Content-Type'] === 'application/json' ||
            e.response.headers['Content-Type'] === 'text/*')
          ? addToast(e.response.data, { appearance: 'error' })
          : addToast('Unexpected error occurred.', { appearance: 'error' });
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return { data, setData, isLoading };
}
