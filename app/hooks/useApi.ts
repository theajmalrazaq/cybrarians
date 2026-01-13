"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface UseApiOptions {
  onSuccess?: (data: any) => void;
  onError?: (error: string) => void;
  shouldRefresh?: boolean;
  refreshDelay?: number;
}

interface ApiState {
  loading: boolean;
  error: string;
  success: string;
}

/**
 * Custom hook for API calls with loading, error, and success states
 */
export function useApi(options: UseApiOptions = {}) {
  const router = useRouter();
  const {
    onSuccess,
    onError,
    shouldRefresh = true,
    refreshDelay = 1000,
  } = options;

  const [state, setState] = useState<ApiState>({
    loading: false,
    error: "",
    success: "",
  });

  const resetState = () => {
    setState({ loading: false, error: "", success: "" });
  };

  const execute = async <T = any>(
    fetcher: () => Promise<Response>,
    successMessage?: string
  ): Promise<T | null> => {
    setState({ loading: true, error: "", success: "" });

    try {
      const response = await fetcher();
      const data = await response.json();

      if (!response.ok) {
        const errorMsg = data.error || "An error occurred";
        setState({ loading: false, error: errorMsg, success: "" });
        onError?.(errorMsg);
        return null;
      }

      const successMsg = successMessage || data.message || "Success!";
      setState({ loading: false, error: "", success: successMsg });
      onSuccess?.(data);

      if (shouldRefresh) {
        setTimeout(() => {
          router.refresh();
        }, refreshDelay);
      }

      return data as T;
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : "An error occurred";
      setState({ loading: false, error: errorMsg, success: "" });
      onError?.(errorMsg);
      return null;
    }
  };

  return {
    ...state,
    execute,
    resetState,
    setError: (error: string) => setState((s) => ({ ...s, error })),
    setSuccess: (success: string) => setState((s) => ({ ...s, success })),
    setLoading: (loading: boolean) => setState((s) => ({ ...s, loading })),
  };
}

/**
 * Custom hook for form submissions
 */
export function useForm<T extends Record<string, any>>(
  initialValues: T,
  options: UseApiOptions = {}
) {
  const [values, setValues] = useState<T>(initialValues);
  const api = useApi(options);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;

    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setValues((prev) => ({ ...prev, [name]: checked }));
    } else {
      setValues((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (
    e: React.FormEvent,
    fetcher: (values: T) => Promise<Response>,
    successMessage?: string
  ) => {
    e.preventDefault();
    return api.execute(() => fetcher(values), successMessage);
  };

  const resetForm = () => {
    setValues(initialValues);
    api.resetState();
  };

  const setValue = (name: keyof T, value: any) => {
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  return {
    values,
    setValues,
    setValue,
    handleChange,
    handleSubmit,
    resetForm,
    ...api,
  };
}

/**
 * Custom hook for delete operations with confirmation
 */
export function useDelete(options: UseApiOptions = {}) {
  const api = useApi(options);

  const executeDelete = async (
    fetcher: () => Promise<Response>,
    confirmMessage = "Are you sure you want to delete this item?",
    successMessage = "Item deleted successfully"
  ) => {
    if (!confirm(confirmMessage)) {
      return null;
    }

    return api.execute(fetcher, successMessage);
  };

  return {
    ...api,
    executeDelete,
  };
}

/**
 * Helper to create API fetch functions
 */
export const apiClient = {
  get: (url: string) => fetch(url, { method: "GET" }),

  post: (url: string, data: any) =>
    fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }),

  put: (url: string, data: any) =>
    fetch(url, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }),

  delete: (url: string) => fetch(url, { method: "DELETE" }),
};
