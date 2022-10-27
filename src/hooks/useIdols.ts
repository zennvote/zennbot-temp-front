import axios from "axios";
import { Idol, IdolResponse } from "src/models/Idol";
import useSWR from "swr";

const fetcher = async (key: string) => {
  const response = await axios.get<IdolResponse[]>(key);

  return response.data.map((idol) => new Idol(idol));
}

export const useIdols = () => {
  const { data, error } = useSWR("idols", fetcher);

  return { idols: data, error };
};
