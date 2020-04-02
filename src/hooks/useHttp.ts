import { useState, useCallback } from 'react';
import { AxiosResponse } from 'axios';
import useHttpError from './useHttpError';

export interface CallAPIParams {
  asyncFunction: (values: any) => any;
  values?: any;
}

const useHttp = <T>() => {
  const [res, setRes] = useState<AxiosResponse<T>>();
  const [loading, setLoading] = useState(false);
  const onError = useHttpError();

  const callAPI = useCallback(
    async (params: CallAPIParams) => {
      const { asyncFunction, values } = params;
      try {
        setLoading(true);
        const res = await asyncFunction(values);
        setRes(res);
      } catch (e) {
        onError(e);
      } finally {
        setLoading(false);
      }
    },
    [onError]
  );

  return { res, loading, callAPI };
};

export default useHttp;
