import { useState } from "react";
import apiClient from "../utils/apiClient";

export const usePost = <PostType>(endpoint: string) => {
  const [state, setState] = useState({
    loading: false,
    error: null as string | null,
  });

  const postData = async (payload: PostType) => {
    setState({ loading: true, error: null });

    try {
      await apiClient.post(endpoint, payload);
      setState({ loading: false, error: null });
    } catch (error: any) {
      console.error(`Error posting data to ${endpoint}:`, error);
      setState({ loading: false, error: error.message });
    }
  };

  return { ...state, postData };
};
