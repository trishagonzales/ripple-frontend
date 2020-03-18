import { useState } from 'react';
import { AxiosRequestConfig, AxiosResponse } from 'axios';
// import { useToasts } from 'react-toast-notifications';
import useAPIError from './useAPIError';
import http from '../api/http.api';
import { deleteJwt } from '../api/auth.api';

export default function useAPI() {
  const [res, setRes] = useState<AxiosResponse | null>();
  const [isLoading, setLoading] = useState(false);
  // const { addToast } = useToasts();
  const onError = useAPIError();

  async function callAPI(params: AxiosRequestConfig) {
    try {
      setLoading(true);
      const res = await http(params);
      setRes(res);
    } catch (e) {
      if (params.method === 'GET' && params.url === '/users/me') deleteJwt();
      onError(e);
    } finally {
      setLoading(false);
    }
  }

  return { res, setRes, isLoading, callAPI };
}
