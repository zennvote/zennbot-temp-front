import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useUser } from '../../hooks/useUser';

import './Register.scss';

const Register = () => {
  const histroy = useHistory();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordValidate, setPasswordValidate] = useState('');
  const { register } = useUser();

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handlePasswordValidateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordValidate(event.target.value);
  };

  const handleClickRegisterButton = () => handleRegister();
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => e.key === 'Enter' && handleRegister();

  const handleRegister = async () => {
    const result = await register(username, password);

    if (!result) {
      setPassword('');
      setPasswordValidate('');
    } else {
      histroy.push('/login');
    }
  };

  return (
    <div className="login">
      <h1>회원가입</h1>
      <div className="form">
        <span>ID</span>
        <input autoFocus type="text" value={username} onChange={handleUsernameChange} />
      </div>
      <div className="form">
        <span>Password</span>
        <input type="password" value={password} onChange={handlePasswordChange} />
      </div>
      <div className="form">
        <span>Validate PW</span>
        <input type="password" value={passwordValidate} onChange={handlePasswordValidateChange} onKeyPress={handleKeyPress} />
      </div>
      <div className="buttons">
        <button onClick={handleClickRegisterButton}>회원가입</button>
      </div>
    </div>
  )
};

export default Register;
