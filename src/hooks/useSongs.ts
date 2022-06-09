import axios from "axios";
import { useEffect } from "react";
import ReconnectingEventSource from "reconnecting-eventsource";
import { atom, useRecoilState } from "recoil";
import { Song, SongResponse } from "src/models/Song";

const songsState = atom<Song[]>({ key: "songs", default: [] });
const songsEventSource = new ReconnectingEventSource(`${process.env.REACT_APP_API_URL}/songs/sse`);

export const useSongs = () => {
  const [songs, setSongs] = useRecoilState(songsState);

  useEffect(() => {
    fetchSong().then((songs) => setSongs(songs));
  }, [setSongs]);
  
  songsEventSource.onmessage = (event) => {
    const data: SongResponse[] = JSON.parse(event.data);

    setSongs(data.map((data) => new Song(data)));
  };

  const fetchSong = async () => {
    const response = await axios.get('songs');
    const data: SongResponse[] = response.data;

    return data.map((data) => new Song(data));
  };

  const addSong = async (title: string) => {
    const response = await axios.post('songs', { title });

    return new Song(response.data);
  };

  const resetSongs = async () => {
    await axios.post('songs/reset');
  };

  const resetCooltimes = async () => {
    await axios.delete('songs/cooltimes');
  };

  const reindexSongs = async (indexes: number[]) => {
    await axios.post('songs/reindex', indexes);
  };

  return {
    songs,
    addSong,
    resetSongs,
    resetCooltimes,
    reindexSongs
  };
};
