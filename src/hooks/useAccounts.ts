import axios from "axios";
import useSWR from "swr";
import { Account, AccountResponse } from "src/models/Account";

const fetcher = async (key: string) => {
  const response = await axios.get<AccountResponse[]>(key);

  return response.data.map((account) => new Account(account));
}

export const useAccounts = () => {
  const { data, error, mutate } = useSWR("viewers", fetcher);

  return { accounts: data, error, mutate };
};
