import { useEffect, useState } from 'react';

/**
 * Custom hook for making API calls.
 *
 * @param {string} url - The URL to make the API call to.
 * @param {string} method - The HTTP method to use for the API call.
 * @returns {Object} An object containing the API call result and status.
 * @property {Array} data - The data returned from the API call.
 * @property {Object} response - The response object from the API call.
 * @property {boolean} isLoading - A flag indicating whether the API call is in progress.
 * @property {boolean} isError - A flag indicating whether an error occurred during the API call.
 *
 * @example
 * const { data, response, isLoading, isError } = useApiCall('https://api.example.com/data', 'GET');
 * // Output:
 * // - data: The data returned from the API call.
 * // - response: The response object from the API call.
 * // - isLoading: A flag indicating whether the API call is in progress.
 * // - isError: A flag indicating whether an error occurred during the API call.
 */
export function useApiCall(url, method) {
  const [data, setData] = useState([]);
  const [response, setResponse] = useState([]);
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
        setResponse(response);

        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        setIsError(true);
      }
    }

    getData();
  }, [url, method]);

  return { data, response, isLoading, isError };
}
