import { FC, useEffect, useState } from "react";
import { NavLink, useHistory } from "react-router-dom";

import LogoImage from 'src/assets/logo.png';
import { useAuth } from 'src/hooks/useAuth';

import './Register.scoped.scss';

export const Register: FC = () => {
  const history = useHistory();
  const { register, isLoggedIn } = useAuth();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  const handleRegister = async () => {
    try {
      if (password !== passwordConfirm) {
        alert('비밀번호가 다릅니다!');
      }
      await register(username, password);
      history.push('/login');
    } catch {
      setPassword('');
    }
  }

  useEffect(() => {
    if (isLoggedIn) {
      history.push('/dashboard');
    }
  }, [history, isLoggedIn])

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
          <div className="fields" onKeyDown={(e) => e.key === 'Enter' && handleRegister()}>
            <input value={username} onChange={(e) => setUsername(e.target.value)} type="text" placeholder="아이디" />
            <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="비밀번호" />
            <input value={passwordConfirm} onChange={(e) => setPasswordConfirm(e.target.value)} type="password" placeholder="비밀번호 확인" />
            <button onClick={handleRegister}>로그인</button>
          </div>
        </div>
      </div>
    </div>
  )
};
