import React, { FC } from 'react';
import { AlertCircle, Coffee, Music, Settings } from 'react-feather';
import { NavLink } from 'react-router-dom';

import LogoImage from 'src/assets/logo.png';

import './Sidebar.scoped.scss';

export const Sidebar: FC = () => {
  return (
    <React.Fragment>
      <img className='logo' src={LogoImage} alt='logo' />

      <div className="button-list max">
        <NavLink to="/dashboard/songs" className={(active) => active ? 'active' : ''}>
          <Music /><span>신청곡 관리</span>
        </NavLink>

        <NavLink to="/dashboard/managers" className={(active) => active ? 'active' : ''}>
          <Coffee /><span>매니저 관리</span>
        </NavLink>

        <NavLink to="/dashboard/settings" className={(active) => active ? 'active' : ''}>
          <Settings /><span>환경설정</span>
        </NavLink>
      </div>

      <div className="button-list">
        <NavLink to="/dashboard/reports" className={(active) => active ? 'active' : ''}>
          <AlertCircle /><span>버그리포트</span>
        </NavLink>
      </div>
    </React.Fragment>
  );
};
