import React, { FC, useState } from 'react';
import { useRouteMatch } from 'react-router-dom';
import { Playlist } from './components/Playlist/Playlist';

import { Sidebar } from './components/Sidebar/Sidebar';

import './Dashboard.scoped.scss';

export const Dashboard: FC = ({ children }) => {
  const [playlistCollapsed, setPlaylistCollapsed] = useState<boolean>(false);
  const idolsMatch = useRouteMatch('/dashboard/idols');

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

      <div className={`playlist ${(playlistCollapsed || idolsMatch?.isExact) && 'collapsed'}`}>
        <div className="collapser" onClick={() => setPlaylistCollapsed(!playlistCollapsed)} />
        <Playlist />
      </div>
    </div>
  );
};
