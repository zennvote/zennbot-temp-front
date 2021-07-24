import axios from 'axios';
import React, { useEffect, useState } from 'react';

import { FiSettings, FiMinusCircle, FiMusic, FiUser, FiAlertCircle, FiChevronsRight } from 'react-icons/fi'
import Switch from 'react-switch';

import io from 'socket.io-client';

import './Dashboard.scss';

const socket = io.connect('http://zennbot.net', {
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

  const handleToggleFreemode = async (checked: boolean) => {
    const { data: { value } } = await axios.post('/api/songs/freemode', { value: checked })

    setFreemode(value);
  }

  return (
    <div className="dashboard">
      <div className="leftbar">
        <ul className="leftbar-menu">
          <li className="active">
            <FiSettings size="18" />
          </li>
        </ul>
      </div>
      <div className="body">
        <h2>환경설정</h2>

        <h3>플래그 관리!!</h3>
        <ul className="flag-list">
          <li>
            <span>신청곡 활성화</span>
            <Switch onChange={() => {}} checked={false} />
          </li>
          <li>
            <span>골든벨 활성화 (무료모드)</span>
            <Switch onChange={handleToggleFreemode} checked={freemode} />
          </li>
        </ul>

        <br />
        <br />

        <h3>매니저 관리</h3>
        <ul className="manager-list">
          <li>
            <span>Test</span>
            <FiMinusCircle size="18" />
          </li>
          <li>
            <span>Test</span>
            <FiMinusCircle size="18" />
          </li>
          <li>
            <span>Test</span>
            <FiMinusCircle size="18" />
          </li>
        </ul>
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
          <span className="btn" onClick={() => axios.post('/api/songs/next')}>
            다음 곡
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
