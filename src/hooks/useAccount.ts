import axios from "axios";
import useSWR from "swr";
import { Account, AccountResponse } from "src/models/Account";

const fetcher = async (key: string) => {
  const response = await axios.get<AccountResponse>(key);

  return new Account(response.data);
};

export const useAccount = (username: string) => {
  const { data, error, mutate } = useSWR(`viewers/${username}`, fetcher);

  return { accounts: data, error, mutate };
};
