import React, { FC } from 'react';

import { Sidebar } from './components/Sidebar';

import './Dashboard.scss';

export const Dashboard: FC = ({ children }) => {
  return (
    <div className='dashboard-root'>
      <div className="sidebar">
        <Sidebar />
      </div>

      <div className="content-wrap">
        <div className="content">
          Content
        </div>
      </div>

      <div className="playlist"></div>
    </div>
  );
};
