import axios from "axios";
import useSWR from "swr";

interface Setting {
  key: string,
  value: boolean,
}

const fetcher = async (key: string) => {
  const response = await axios.get<Setting>(key);

  return response.data;
};

export const useSettings = (key: string) => {
  const { data, error, mutate } = useSWR(`settings/${key}`, fetcher);

  const update = async (value: boolean) => {
    await axios.patch(`settings/${key}`, { value });
    await mutate();
  }

  return { setting: data, error, update };
};