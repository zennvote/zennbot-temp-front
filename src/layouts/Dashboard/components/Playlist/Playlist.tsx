import React, { FC, useMemo } from "react";

import { List, OnChangeMeta } from 'react-movable';
import { Music } from 'react-feather';

import { useSongs } from "src/hooks/useSongs";
import { Song } from "src/models/Song";

import './Playlist.scoped.scss';

type IndexedSong = Song & { index: number };
export const Playlist: FC = () => {
  const { songs, reindexSongs } = useSongs();
  const indexedSongs = useMemo((): IndexedSong[] => songs.map((song, index): IndexedSong => ({ ...song, index })), [songs]);

  const handleListReindexed = ({ newIndex, oldIndex }: OnChangeMeta) => {
    const songs = [...indexedSongs];

    const song = indexedSongs[oldIndex];
    songs.splice(oldIndex, 1);
    songs.splice(newIndex, 0, song);

    const indexes = songs.map(({ index }) => index);

    reindexSongs(indexes);
  };

  return (
    <div className="root">
      <h2>Playlist</h2>

      <List
        values={indexedSongs}
        onChange={handleListReindexed}
        renderList={({ children, props }) => <ul {...props}>{ children }</ul>}
        renderItem={({ value, props, isDragged, isSelected }) => (
          <li { ...props } key={value.index} className={`${isDragged || 'dragged'} ${isSelected || 'selected'}`}>
            <div className="index">
              {value.index === 0 ? <Music size={14} /> : value.index + 1}
            </div>
            <div className="body">
              <span className="title">{value.title}</span>
              <span className="requestor">{value.requestorName}</span>
            </div>
          </li>
        )}
      />
    </div>
  );
};
