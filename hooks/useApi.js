import { useState } from 'react';

export function useApi(apiFunction) {
  const [response, setResponse] = useState({
    data: null,
    isFetching: false,
    error: null,
    isSuccess: false
  })

  const fetchMethod = () => {
    setResponse({
      data: null,
      isFetching: true,
      error: null,
      isSuccess: false
    });

    apiFunction()
      .then(res => {
        setResponse({
          ...response,
          data: res,
          isFetching: false,
          isSuccess: true
        })
      })
      .catch(err => {
        setResponse({
          ...response,
          isFetching: false,
          error: err.message
        })
      })
  };

  return [response, fetchMethod];
}

