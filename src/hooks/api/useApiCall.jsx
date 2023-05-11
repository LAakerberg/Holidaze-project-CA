import { useEffect, useState } from 'react';

export function useApiCall(url) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    async function getData() {
      try {
        setIsError(false);
        setIsLoading(true);

        const accessToken = localStorage.getItem('accessToken');
        const fetchOptions = {
          headers: {
            'Content-type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
        };

        const response = await fetch(url, fetchOptions);

        const json = await response.json();
        setData(json);

        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        setIsError(true);
      }
    }

    getData();
  }, [url]);

  return { data, isLoading, isError };
}
