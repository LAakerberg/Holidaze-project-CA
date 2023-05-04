import { useEffect, useState } from 'react';
import { baseUrl, getAllVenues } from './apiBase';

export function useFetchVenues() {
  const [venues, setVenues] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    async function getVenues() {
      try {
        setIsError(false);

        setIsLoading(true);

        const response = await fetch(
          baseUrl + getAllVenues + '?limit=10_&offset=0'
        );

        const json = await response.json();
        setVenues(json);

        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        setIsError(true);
      }
    }

    getVenues();
  }, []);

  return { venues, isLoading, isError };
}
