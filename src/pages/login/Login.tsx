import { FC } from "react";
import { NavLink } from "react-router-dom";

import LogoImage from '../../assets/logo.png';

import './Login.scoped.scss';

export const Login: FC = () => {
  return (
    <div className="root">
      <div className="wrapper">
        <img src={LogoImage} alt="logo" className="logo" />
        <div className="form">
          <div className="router">
            <NavLink to='/login' className={(active) => active ? 'active' : ''}>로그인</NavLink>
            <NavLink to='/register' className={(active) => active ? 'active' : ''}>회원가입</NavLink>
          </div>
          <div className="anchor">
            <div className="triangle" />
          </div>
          <div className="fields">
            <input type="text" placeholder="아이디" />
            <input type="password" placeholder="비밀번호" />
            <button>로그인</button>
          </div>
        </div>
      </div>
    </div>
  )
};
