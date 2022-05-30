import { FC, useState } from "react";
import { NavLink, useHistory } from "react-router-dom";

import LogoImage from '../../assets/logo.png';
import { login } from "../../hooks/useAuth";

import './Login.scoped.scss';

export const Login: FC = () => {
  const history = useHistory();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      await login(username, password);
      history.push('/dashboard');
    } catch {
      setPassword('');
    }
    
  }

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
          <div className="fields" onKeyDown={(e) => e.key === 'Enter' && handleLogin()}>
            <input value={username} onChange={(e) => setUsername(e.target.value)} type="text" placeholder="아이디" />
            <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="비밀번호" />
            <button onClick={handleLogin}>로그인</button>
          </div>
        </div>
      </div>
    </div>
  )
};
