import React, { FC, useState } from 'react';
import { Playlist } from './components/Playlist/Playlist';

import { Sidebar } from './components/Sidebar/Sidebar';

import './Dashboard.scoped.scss';

export const Dashboard: FC = ({ children }) => {
  const [playlistCollapsed, setPlaylistCollapsed] = useState<boolean>(false);

  return (
    <div className='dashboard-root'>
      <div className="sidebar">
        <Sidebar />
      </div>

      <div className="content-wrap">
        <div className="content">
          { children }
        </div>
      </div>

      <div className={`playlist ${playlistCollapsed && 'collapsed'}`}>
        <div className="collapser" onClick={() => setPlaylistCollapsed(!playlistCollapsed)} />
        <Playlist />
      </div>
    </div>
  );
};
