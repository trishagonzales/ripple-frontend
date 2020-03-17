import { useState } from 'react';
import { useToasts } from 'react-toast-notifications';
import { AxiosRequestConfig, AxiosResponse } from 'axios';
import http from '../api/http.api';
import { deleteJwt } from '../api/auth.api';

export default function useAPI() {
  const [res, setRes] = useState<AxiosResponse | null>();
  const [isLoading, setLoading] = useState(false);
  const { addToast } = useToasts();

  async function callAPI(params: AxiosRequestConfig) {
    try {
      setLoading(true);
      const res = await http(params);
      setRes(res);
    } catch (e) {
      if (params.method === 'GET' && params.url === '/users/me') deleteJwt();

      return e.response
        ? addToast(e.response.data, { appearance: 'error' })
        : addToast('Unexpected error occurred.', { appearance: 'error' });
    } finally {
      setLoading(false);
    }
  }

  return { res, setRes, isLoading, callAPI };
}
