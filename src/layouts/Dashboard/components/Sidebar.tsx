import React, { FC } from 'react';
import { AlertCircle, Coffee, Music, Settings } from 'react-feather';

import LogoImage from '../../../assets/logo.png';

import './Sidebar.scss';

export const Sidebar: FC = () => {
  return (
    <React.Fragment>
      <img className='logo' src={LogoImage} alt='logo' />

      <div className="button-list max">
        <button className='active'>
          <Music /> 신청곡 관리
        </button>
        <button>
          <Coffee /> 매니저 관리
        </button>
        <button>
          <Settings /> 환경설정
        </button>
      </div>

      <div className="button-list">
        <button>
          <AlertCircle /> 버그리포트
        </button>
      </div>
    </React.Fragment>
  );
};
