import axios from "axios";
import useSWR from "swr";

const fetcher = (key: string) => axios.get(key, {
  baseURL: process.env.REACT_APP_API_URL
}).then(res => res.data)

export const useFlags = () => {
  const { data, error, mutate } = useSWR('/api/flags', fetcher);

  const update = async (key: string, value: boolean) => {
    await axios.post(`/api/flags/${key}`, { value });
    await mutate();
  }

  return {
    flags: data,
    update,
    isLoading: !error && !data,
    isError: error,
  };
};