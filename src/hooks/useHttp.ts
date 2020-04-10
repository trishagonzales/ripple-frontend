import { useState, useCallback } from 'react';
import { AxiosResponse } from 'axios';
import useHttpError from './useHttpError';

export interface CallAPIParams {
  asyncFunction: (values: any) => any;
  values?: any;
}

const useHttp = <T = any>() => {
  const [res, setRes] = useState<AxiosResponse<T>>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const onError = useHttpError();

  const callAPI = useCallback(
    async (params: CallAPIParams) => {
      const { asyncFunction, values } = params;
      try {
        setLoading(true);
        setError(null);
        const res = await asyncFunction(values);
        setRes(res);
      } catch (e) {
        setError(e);
        onError(e);
      } finally {
        setLoading(false);
      }
    },
    [onError]
  );

  return { res, loading, error, callAPI };
};

export default useHttp;
