import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useUser } from '../../hooks/useUser';

import './Login.scss';

const Login = () => {
  const histroy = useHistory();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useUser();

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleClickLoginButton = () => handleLogin();
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => e.key === 'Enter' && handleLogin();

  const handleLogin = async () => {
    const result = await login(username, password);

    if (!result) {
      setPassword('');
    } else {
      histroy.push('/');
    }
  };

  return (
    <div className="login">
      <h1>Welcome!</h1>
      <div className="form">
        <span>ID</span>
        <input autoFocus type="text" value={username} onChange={handleUsernameChange} />
      </div>
      <div className="form">
        <span>Password</span>
        <input type="password" value={password} onChange={handlePasswordChange} onKeyPress={handleKeyPress} />
      </div>
      <button onClick={handleClickLoginButton}>로그인</button>
    </div>
  )
};

export default Login;
