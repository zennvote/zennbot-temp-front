import React, { useEffect, useState } from 'react';

import io from 'socket.io-client';

import './Broadcast.scss';

const socket = io.connect({
  transports: ['websocket'],
});

const Broadcast = () => {
  const [songs, setSongs] = useState<any[]>([]);

  useEffect(() => {
    socket.emit('songs.update');
    socket.on('songs.updated', (payload: any[]) => {
      setSongs(payload);
    });
  }, []);

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
