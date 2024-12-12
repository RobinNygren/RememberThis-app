import { useState } from "react";
import apiClient from "../utils/apiClient";

export const useDelete = (endpoint: string) => {
  const [state, setState] = useState({
    loading: false,
    error: null as string | null,
  });

  const deleteData = async (url: string) => {
    setState({ loading: true, error: null });

    try {
      await apiClient.delete(`${endpoint}${url}`);
      setState({ loading: false, error: null });
    } catch (error: any) {
      console.error(`Error deleting data from ${endpoint}${url}:`, error);
      setState({ loading: false, error: error.message });
    }
  };

  return { ...state, deleteData };
};
