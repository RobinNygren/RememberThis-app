import { useState } from "react";
import apiClient from "../utils/apiClient";
import { FetchState } from "../types/types";

export const useFetch = <FetchType, PostType>(endpoint: string) => {
  const [state, setState] = useState<FetchState<FetchType>>({
    data: null,
    error: null,
    loading: false,
  });

  const fetchData = async () => {
    setState({ data: null, error: null, loading: true });

    try {
      const response = await apiClient.get<FetchType>(endpoint);
      setState({ data: response.data, error: null, loading: false });
    } catch (error: any) {
      setState({ data: null, error: error.message, loading: false });
    }
  };

  const postData = async (payload: PostType) => {
    try {
      await apiClient.post<PostType>(endpoint, payload);
    } catch (error: any) {
      setState({ ...state, error: error.message, loading: false });
    }
  };

  return { ...state, fetchData, postData };
};

export default useFetch;
