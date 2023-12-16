import { useState, useEffect, useCallback } from "react";

const useDataFetching = (url: string) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(false);

    try {
      const res = await fetch(url);
      const result = await res.json();
      setData(result);
    } catch (error) {
      setError(true);
    }
    setLoading(false);
  }, [url]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error };
};

export default useDataFetching;
