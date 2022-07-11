import axios from "axios";
import useSWR from "swr";
import { Manager, ManagerResponse } from "src/models/Manager";

const fetcher = async (key: string) => {
  const response = await axios.get<ManagerResponse[]>(key);

  return response.data.map((manager) => new Manager(manager));
}

export const useManagers = () => {
  const { data, error, mutate } = useSWR("managers", fetcher);

  const create = async (twitchId: string) => {
    await axios.post('managers', { twitchId });
    await mutate();
  };

  const remove = async (twitchId: string) => {
    await axios.delete(`managers/${twitchId}`);
    await mutate();
  }

  return { managers: data, error, create, remove };
};
