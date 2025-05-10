import { useCallback, useEffect, useState } from "react";

type Params = {
  params?: Record<string, string | number>;
};

type FetchRes<T> = {
  data: T | null;
  isLoading: boolean;
  error: string | null;
  refetch: (params: Params) => void;
};

export function useFetch<T>(fetchUrl: string): FetchRes<T> {
  const [url, setUrl] = useState(fetchUrl);
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      setData(result);
      setError(null);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unknown error occurred"
      );
      setData(null);
    } finally {
      setIsLoading(false);
    }
  }, [url]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const refetch = (params: Params) => {
    const newUrl = params
      ? `${fetchUrl}?_limit=${params.params?._limit}`
      : fetchUrl;
    setUrl(newUrl);
  };

  return { data, isLoading, error, refetch };
}
