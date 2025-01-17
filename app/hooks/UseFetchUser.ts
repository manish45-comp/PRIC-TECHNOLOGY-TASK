import { useState, useEffect } from "react";
import api from "../services/api";

import { UpdateUserRequest } from "../types/user";

const useFetchUser = (userId?: string) => {
  const [userData, setUserData] = useState<UpdateUserRequest>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!userId) return;

    const fetchUser = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await api.get(`/getUserById?id=${userId}`);
        setUserData(response.data);
      } catch (err: any) {
        setError(err.message || "Failed to fetch user");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, [userId]);

  return { userData, isLoading, error, setUserData };
};

export default useFetchUser;
