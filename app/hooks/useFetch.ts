import { useState } from "react";
import apiClient from "../utils/apiClient";

export const useFetch = <FetchType>(endpoint: string) => {
  const [state, setState] = useState({
    data: null as FetchType | null,
    error: null as string | null,
    loading: false,
  });

  const fetchData = async () => {
    setState({ data: null, error: null, loading: true });

    try {
      const response = await apiClient.get<FetchType>(endpoint);
      setState({ data: response.data, error: null, loading: false });
      return response.data;
    } catch (error: any) {
      console.error(`Error fetching data from ${endpoint}:`, error);
      setState({ data: null, error: error.message, loading: false });
    }
  };

  return { ...state, fetchData };
};

export default useFetch;
