import React, { FC } from "react";

import { Music } from 'react-feather';
import { useSongs } from "src/hooks/useSongs";

import './Playlist.scoped.scss';

export const Playlist: FC = () => {
  const { songs } = useSongs();

  return (
    <div className="root">
      <h2>Playlist</h2>
      <ul>
        {
          songs.map((song, index) => (
            <li key={index}>
              <div className="index">
                { index === 0 ? <Music size={14} /> : index + 1 }
              </div>
              <div className="body">
                <span className="title">{ song.title }</span>
                <span className="requestor">{ song.requestorName }</span>
              </div>
            </li>
          ))
        }
      </ul>
    </div>
  );
};
