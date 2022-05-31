import React, { FC } from "react";

import { Music } from 'react-feather';

import './Playlist.scoped.scss';

export const Playlist: FC = () => {
  return (
    <div className="root">
      <h2>Playlist</h2>
      <ul>
        <li>
          <div className="index">
            <Music size={14} />
          </div>
          <div className="body">
            <span className="title">일루미네이트 콘서트</span>
            <span className="requestor">시프트</span>
          </div>
        </li>
        <li>
          <div className="index">2</div>
          <div className="body">
            <span className="title">イルミネイトコンサート</span>
            <span className="requestor">프로듀서_젠</span>
          </div>
        </li>
        <li>
          <div className="index">3</div>
          <div className="body">
            <span className="title">Daybreak Age</span>
            <span className="requestor">시프트</span>
          </div>
        </li>
      </ul>
    </div>
  );
};
