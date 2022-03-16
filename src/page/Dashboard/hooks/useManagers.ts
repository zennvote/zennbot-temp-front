import axios from "axios";
import useSWR from "swr";
import { Manager } from "../../../models/Manager";

const baseURL = process.env.REACT_APP_API_URL;

const fetcher = (key: string) => axios.get(key, { baseURL })
  .then(res => res.data.map(({ username }: any) => new Manager(username)));

export const useManagers = () => {
  const { data, error, mutate } = useSWR<Manager[]>('/api/managers', fetcher);

  const create = async (username: string) => {
    await axios.post(`/api/managers/${username}`, { baseURL });
    
    mutate();
  };

  const remove = async (username: string) => {
    await axios.delete(`/api/managers/${username}`, { baseURL });
    
    mutate();
  };

  return {
    managers: data,
    create,
    remove,
    isLoading: !error && !data,
    isError: error,
  };
};