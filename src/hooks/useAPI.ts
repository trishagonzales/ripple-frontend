import { useState } from 'react';
import { useToasts } from 'react-toast-notifications';
import http from '../api/http.api';

export interface UseAPIParams {
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  url: string;
  data: any;
}

export default function useAPI() {
  const [res, setRes] = useState();
  const [isLoading, setLoading] = useState(false);
  const { addToast } = useToasts();

  async function callAPI(params: UseAPIParams) {
    try {
      setLoading(true);
      const res = await http(params);
      setRes(res);
    } catch (e) {
      return e.response
        ? addToast(e.response.data, { appearance: 'error' })
        : addToast('Unexpected error occurred.', { appearance: 'error' });
    } finally {
      setLoading(false);
    }
  }

  return { res, isLoading, callAPI };
}
