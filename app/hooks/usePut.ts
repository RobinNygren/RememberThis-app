import { useState } from "react";
import apiClient from "../utils/apiClient";

export const usePut = <PutType>(endpoint: string) => {
  const [state, setState] = useState({
    loading: false,
    error: null as string | null,
  });

  const putData = async (url: string, payload: PutType) => {
    setState({ loading: true, error: null });

    try {
      await apiClient.put(`${endpoint}${url}`, payload);
      setState({ loading: false, error: null });
    } catch (error: any) {
      console.error(`Error putting data to ${endpoint}${url}:`, error);
      setState({ loading: false, error: error.message });
    }
  };

  return { ...state, putData };
};
