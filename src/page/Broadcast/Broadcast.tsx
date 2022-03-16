import React, { useEffect, useState } from 'react';
import { useSongs } from '../Dashboard/hooks/useSongs';

import './Broadcast.scss';

const Broadcast = () => {
  const { songs } = useSongs();

  if (!songs) {
    return <div>Loading...</div>
  }

  return (
    <div className="broadcast">
      <h3>현재 {songs.length}개의 곡이 신청되었습니다.</h3>
      <ul>
        { songs.map((song) => (
          <li key={`${song.title}-${song.requestor}`}>
            <h1>{ song.title }</h1>
            <p>{ song.requestorName }</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Broadcast;
