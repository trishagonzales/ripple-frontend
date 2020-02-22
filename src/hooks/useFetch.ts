import { useState, useEffect } from 'react';
import { useToasts } from 'react-toast-notifications';
import http from '../api/http.api';

export default function useFetch(config: any) {
  const [data, setData] = useState();
  const [isLoading, setLoading] = useState();
  const { addToast } = useToasts();

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const { data } = await http(config);
        setData(data);
      } catch (e) {
        return e.response
          ? addToast(e.response.data, { appearance: 'error' })
          : addToast('Unexpected error occurred.', { appearance: 'error' });
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return { data, isLoading };
}
