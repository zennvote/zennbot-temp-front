import React, { FC, useMemo } from "react";
import { List, OnChangeMeta } from 'react-movable';
import { Item, Menu, useContextMenu } from "react-contexify";
import { Bell, FastForward, Music } from 'react-feather';

import { useSongs } from "src/hooks/useSongs";
import { Song } from "src/models/Song";

import "react-contexify/dist/ReactContexify.css";
import './Playlist.scoped.scss';
import { useSettings } from "src/hooks/useSettings";

const MENU_ID = 'playlist-context';

type IndexedSong = Song & { index: number };
export const Playlist: FC = () => {
  const { songs, reindexSongs, deleteSong, skipSong } = useSongs();
  const { setting: isRequestEnabled, update: setRequestEnabled } = useSettings('request-enabled');
  const { setting: isGoldenBell, update: setGoldenBell } = useSettings('goldenbell-enabled');
  const indexedSongs = useMemo((): IndexedSong[] => songs.map((song, index): IndexedSong => ({ ...song, index })), [songs]);

  const { show } = useContextMenu({ id: MENU_ID });

  const handleClickNext = () => {
    skipSong();
  };

  const handleContextMenu: React.MouseEventHandler<HTMLLIElement> = (event) => {
    show(event, { props: { index: Number(event.currentTarget.id) } });
  };
  const handleClickSongDelete = (indexStr: string) => {
    const index = parseInt(indexStr, 10);
    deleteSong(index);
  };
  const handleClickSongRefund = (indexStr: string) => {
    const index = parseInt(indexStr, 10);
    deleteSong(index, true);
  };

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
      <div className="header">
        <div className="title">
          <h2>재생 대기열</h2>
          <span>/ { songs.length }곡</span>
        </div>

        <FastForward className="next" onClick={handleClickNext} />
      </div>

      <List
        values={indexedSongs}
        onChange={handleListReindexed}
        renderList={({ children, props }) => <ul {...props}>{children}</ul>}
        renderItem={({ value, props, isDragged, isSelected }) => (
          <li
            {...props}
            id={`${value.index}`}
            key={value.index}
            className={`${isDragged || 'dragged'} ${isSelected || 'selected'}`}
            onContextMenu={handleContextMenu}
          >
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

      <div className="controller">
        {/* <ChevronUp className="collapse" /> */}
        <div className="buttons">
          <Music
            className={isRequestEnabled?.value ? 'on' : ''}
            onClick={() => setRequestEnabled(!isRequestEnabled?.value)}
          />
          <Bell
            className={isGoldenBell?.value ? 'on' : ''}
            onClick={() => setGoldenBell(!isGoldenBell?.value)}
          />
        </div>
      </div>

      <Menu id={MENU_ID}>
        <Item onClick={({ props: { index } }) => handleClickSongDelete(index)}>
          삭제
        </Item>
        <Item onClick={({ props: { index } }) => handleClickSongRefund(index)}>
          환불
        </Item>
      </Menu>
    </div>
  );
};
