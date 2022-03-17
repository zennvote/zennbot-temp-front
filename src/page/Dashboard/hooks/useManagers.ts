import axios from "axios";
import useSWR from "swr";
import { Manager } from "../../../models/Manager";

const baseURL = process.env.REACT_APP_API_URL;

const fetcher = (key: string) => axios.get(key, { baseURL })
  .then(res => res.data.map(({ twitchId }: any) => new Manager(twitchId)));

export const useManagers = () => {
  const { data, error, mutate } = useSWR<Manager[]>('/api/managers', fetcher);

  const create = async (twitchId: string) => {
    await axios.post(`/api/managers`, { twitchId }, { baseURL });

    mutate();
  };

  const remove = async (twitchId: string) => {
    await axios.delete(`/api/managers/${twitchId}`, { baseURL });

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