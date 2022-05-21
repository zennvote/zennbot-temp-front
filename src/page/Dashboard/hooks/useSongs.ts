import axios from "axios";
import useSWR from "swr";
import { Song, SongResponse } from "../../../models/Song";

const eventSource = new EventSource(`${process.env.REACT_APP_API_URL}/api/songs/sse`);

const baseURL = process.env.REACT_APP_API_URL;
const fetcher = (key: string) => axios.get(key, { baseURL })
  .then((res) => res.data.map((data: SongResponse) => new Song(data)))

export const useSongs = () => {
  const { data, error, mutate } = useSWR<Song[]>('/api/songs', fetcher);

  eventSource.onmessage = (event) => {
    const data: SongResponse[] = JSON.parse(event.data);
    console.log(event, data);

    mutate(data.map((data) => new Song(data)));
  };

  const resetCooltime = async () => {
    await axios.delete(`${process.env.REACT_APP_API_URL}/api/songs/cooltimes`, { withCredentials: true });
  };

  const create = async (title: string) => {
    const { data } = await axios.post(`${process.env.REACT_APP_API_URL}/api/songs/${title}`, { withCredentials: true });

    console.log(data);

    return data;
  };

  return {
    songs: data,
    isLoading: !error && !data,
    isError: error,
    create,
    resetCooltime,
  }
};
