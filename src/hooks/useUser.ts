import axios from "axios";
import { useEffect, useMemo, useState } from "react";

const validateToken = async (token: string) => {
  try {
    await axios.get(`${process.env.REACT_APP_API_URL}/api/auth/validate`, { withCredentials: true, headers: { Authorization: `Bearer ${token}` } });
    return true;
  } catch {
    return false;
  }
};

export const useUser = () => {
  const [isLoading, setLoading] = useState(true);
  const [token, setToken] = useState<string>();

  useEffect(() => {
    const existing = localStorage.getItem('ujt');
    if (!existing) {
      return;
    }

    validateToken(existing)
      .then((isValid) => {
        setToken(isValid ? existing : undefined);
        axios.defaults.headers.Authorization = `Bearer ${existing}`;
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const isLoggedIn = useMemo(() => !!token, [token]);

  const login = async (username: string, password: string) => {
    const { data } = await axios.post(`${process.env.REACT_APP_API_URL}/api/auth/login`, {
      username,
      password,
    }, { withCredentials: true });


    if (data?.access_token) {
      localStorage.setItem('ujt', data.access_token);
      setToken(data.access_token);
      axios.defaults.headers.Authorization = `Bearer ${data.access_token}`;
    }

    return data?.access_token;
  };

  return { isLoading, isLoggedIn, login };
};
