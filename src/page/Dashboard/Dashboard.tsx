import axios from 'axios';
import React, { useState } from 'react';
import { Item, Menu, theme, useContextMenu } from 'react-contexify';

import { FiSettings, FiMinusCircle, FiMusic, FiUser, FiAlertCircle, FiChevronsRight } from 'react-icons/fi'
import { Redirect } from 'react-router-dom';
import { useUser } from '../../hooks/useUser';

import "react-contexify/dist/ReactContexify.css";
import './Dashboard.scss';
import { useManagers } from './hooks/useManagers';
import { useSongs } from './hooks/useSongs';

const Dashboard = () => {
  const { isLoading, isLoggedIn } = useUser();

  const [managerText, setManagerText] = useState<string>('');
  const [customSongText, setCustomSongText] = useState<string>('');

  const { songs, resetCooltime, create: createSong, remove: deleleSong } = useSongs();
  const { managers, create: createManager, remove } = useManagers();

  const { show: showContextMenu } = useContextMenu({
    id: 'songs-item',
  });

  const handleClickCreateManager = () => {
    createManager(managerText);
    setManagerText('');
  };
  const handleClickRemoveManager = (twitchId: string) => remove(twitchId);
  const handleClickResetCooltime = () => resetCooltime();

  const handleClickCreateCustomSong = () => {
    createSong(customSongText);
    setCustomSongText('');
  };

  const handleSongContextMenu = (e: React.MouseEvent) => {
    showContextMenu(e, { props: { index: Number(e.currentTarget.id) } })
  }

  const handleClickSongDelete = (indexStr: string) => {
    const index = parseInt(indexStr, 10);
    deleleSong(index);
  }
  const handleClickSongRefund = (indexStr: string) => {
    const index = parseInt(indexStr, 10);
    deleleSong(index, true);
  }

  if (isLoading) {
    return <div />
  }
  else if (!isLoggedIn) {
    return <Redirect to="/login" />;
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

        <h3>매니저 관리</h3>
        <ul className="manager-list">
          {
            managers && managers.map((manager: any) => (
              <li>
                <span>{ manager.twitchId }</span>
                <FiMinusCircle size="18" onClick={() => handleClickRemoveManager(manager.twitchId)} />
              </li>
            ))
          }
        </ul>
        <div className="manager-form">
          <input type="text" value={managerText} placeholder="트위치 아이디를 입력해주세요" onChange={({ target: { value } }) => setManagerText(value)} />
          <button onClick={handleClickCreateManager}>생성</button>
        </div>

        <br />
        <br />

        <h3>신청곡 관리</h3>
        <div className="song-buttons">
          <button className="primary" onClick={handleClickResetCooltime}>신청곡 쿨타임 초기화</button>
        </div>

        <h3>임의 신청곡 추가</h3>
        <div className="song-form">
          <input type="text" value={customSongText} placeholder="추가할 노래 제목을 입력해주세요" onChange={({ target: { value } }) => setCustomSongText(value)} />
          <button onClick={handleClickCreateCustomSong}>추가</button>
        </div>
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
          <span className="btn" onClick={() => axios.post('/api/songs/skip')}>
            다음 곡
            <FiChevronsRight />
          </span>
        </div>
        <ul className="music_list">
          {songs && songs.map((item, index) => (
            <li id={`${index}`} key={index} onContextMenu={handleSongContextMenu}>
              <p className="title">
                {index === 0 && <FiMusic />}
                {item.title}
              </p>
              <p className="subtitle">{item.requestorName}</p>
            </li>
          ))}
        </ul>
      </div>

      <Menu id='songs-item' theme={theme.light}>
        <Item onClick={({ props: { index } }) => handleClickSongDelete(index)}>
          삭제
        </Item>
        <Item onClick={({ props: { index } }) => handleClickSongRefund(index)}>
          환불
        </Item>
      </Menu>
    </div>
  );
};

export default Dashboard;
