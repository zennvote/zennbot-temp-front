import axios from 'axios';
import React, { useEffect, useState } from 'react';

import { FiMusic, FiUser, FiAlertCircle, FiChevronsRight } from 'react-icons/fi'

import io from 'socket.io-client';

import './Dashboard.scss';

const socket = io.connect('localhost:4000', {
  transports: ['websocket'],
});

const Dashboard = () => {
  const [songs, setSongs] = useState<any[]>([]);
  const [freemode, setFreemode] = useState<boolean>(false);
  console.log(freemode);

  useEffect(() => {
    socket.emit('songs.update');
    socket.on('songs.updated', (payload: any[]) => {
      setSongs(payload);
    });
  }, []);

  const handleClickFreemode = async () => {
    const { data: { value } } = await axios.post('http://zennbot-local.test:3000/songs/freemode', { value: !freemode })

    setFreemode(value);
  }

  return (
    <div className="dashboard">
      <div className="leftbar">
        <FiMusic className="leftbar-menu active" size="18" />
        <FiMusic className="leftbar-menu" size="18" />
        <FiMusic className="leftbar-menu" size="18" />
      </div>
      <div className="body">

      </div>
      <div className="rightbar">
        <ul className="iconbar">
          <li>
            <FiAlertCircle size="18" />
          </li>
          <li>
            <FiUser size="18" />
          </li>
        </ul>

        <div className="music_list-header">
          <h3>Musics</h3>
          <span className="btn" onClick={() => axios.post('http://zennbot-local.test:3000/songs/next')}>
            다음 곡
            <FiChevronsRight />
          </span>
          <span className="btn" style={{ fontWeight: freemode ? 'bold' : 'normal' }} onClick={() => handleClickFreemode()}>
            골든벨
            <FiChevronsRight />
          </span>
        </div>
        <ul className="music_list">
          {songs.map((item, index) => (
            <li key={index}>
              <p className="title">
                {index === 0 && <FiMusic />}
                {item.title}
              </p>
              <p className="subtitle">{item.requestorName}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
