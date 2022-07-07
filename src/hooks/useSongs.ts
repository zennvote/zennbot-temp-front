/* eslint-disable react-hooks/exhaustive-deps */

import axios from "axios";
import { useEffect } from "react";
import ReconnectingEventSource from "reconnecting-eventsource";
import { atom, useRecoilState } from "recoil";
import { Song, SongResponse } from "src/models/Song";

const cooltimeSongsState = atom<Song[]>({ key: "cooltime-songs", default: [] });
const songsState = atom<Song[]>({ key: "songs", default: [] });
const songsEventSource = new ReconnectingEventSource(
  `${process.env.REACT_APP_API_URL}/songs/sse`
);
const cooltimeSongsEventSource = new ReconnectingEventSource(
  `${process.env.REACT_APP_API_URL}/songs/cooltimes/sse`
);

export const useSongs = () => {
  const [songs, setSongs] = useRecoilState(songsState);
  const [cooltimeSongs, setCooltimeSongs] = useRecoilState(cooltimeSongsState);

  useEffect(() => {
    fetchSong();
  }, [setSongs]);

  useEffect(() => {
    fetchCooltimeSongs();
  }, []);

  songsEventSource.onmessage = (event) => {
    const data: SongResponse[] = JSON.parse(event.data);

    setSongs(data.map((data) => new Song(data)));
  };

  cooltimeSongsEventSource.onmessage = (event) => {
    const data: SongResponse[] = JSON.parse(event.data);

    setCooltimeSongs(data.map((data) => new Song(data)));
  }

  const fetchSong = async () => {
    const response = await axios.get("songs");
    const data: SongResponse[] = response.data;

    const songs = data.map((data) => new Song(data));

    setSongs(songs);
  };

  const fetchCooltimeSongs = async () => {
    const response = await axios.get('songs/cooltimes');
    const data: SongResponse[] = response.data;

    const songs = data.map((data) => new Song(data));

    setCooltimeSongs(songs);
  }

  const addSong = async (title: string) => {
    const response = await axios.post("songs", { title });

    return new Song(response.data);
  };

  const skipSong = async () => {
    if (songs.length > 0) {
      const [, ...remains] = songs;
      setSongs(remains);
    }
    const response = await axios.post("songs/skip");

    return new Song(response.data);
  };

  const resetSongs = async () => {
    await axios.post("songs/reset");
  };

  const resetCooltimes = async () => {
    await axios.delete("songs/cooltimes");
  };

  const reindexSongs = async (indexes: number[]) => {
    await axios.post("songs/reindex", indexes);
  };

  const deleteSong = async (index: number, isRefund = false) => {
    await axios.delete(`songs/${index}?${isRefund ? "refund" : ""}`);
  };

  return {
    songs,
    cooltimeSongs,
    addSong,
    skipSong,
    resetSongs,
    resetCooltimes,
    reindexSongs,
    deleteSong,
  };
};
