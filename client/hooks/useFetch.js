import { useEffect, useState } from 'react';

export function useFetch(fetchFn, initialValue) {
  const [isLoading, setIsLoading] = useState();
  const [error, setError] = useState();
  const [fetchedData, setFetchedData] = useState(initialValue);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const data = await fetchFn();
        setFetchedData(data);
      } catch (error) {
        setError({ message: error.message || 'Failed to fetch data.' });
      }
      setIsLoading(false);
    };
    fetchData();
  }, [fetchFn]);

  return {
    isLoading,
    fetchedData,
    setFetchedData,
    error,
  };
}
