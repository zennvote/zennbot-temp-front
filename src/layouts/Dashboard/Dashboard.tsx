import React, { FC } from 'react';
import { Playlist } from './components/Playlist/Playlist';

import { Sidebar } from './components/Sidebar/Sidebar';

import './Dashboard.scoped.scss';

export const Dashboard: FC = ({ children }) => {
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

      <div className="playlist">
        <Playlist />
      </div>
    </div>
  );
};
