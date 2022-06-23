import axios, { AxiosResponse } from "axios";
import { atom, useRecoilState } from "recoil";

const JwtExpiryTime = 60 * 1000;

export const isLoggedInState = atom({ key: 'isLoggedIn', default: false });
export const isLoggingInState = atom({ key: 'isLoggingIn', default: true });

export const useAuth = () => {
  const [isLoggedIn, setLoggedIn] = useRecoilState(isLoggedInState);
  const [isLoggingIn, setLoggingIn] = useRecoilState(isLoggingInState);

  const login = async (username: string, password: string) => {
    const data = { username, password };
    try {
      setLoggingIn(true);
      const response = await axios.post('/auth/login', data);
      handleLoginSuccess(response);
    } catch (error) {
      handleLoginFail();
      throw error;
    }
  };

  const register = async (username: string, password: string) => {
    const data = { username, password };
    const response = await axios.post('/user', data);  
    
    return response.data as { id: number, username: string, password: string };
  };
  
  const handleRefreshToken = async () => {
    try {
      setLoggingIn(true);
      const response = await axios.post('/auth/refresh');
      handleLoginSuccess(response);
    } catch (error) {
      handleLoginFail();
      throw error;
    }
  };
  
  const handleLoginSuccess = (response: AxiosResponse) => {
    const { access_token } = response.data;
  
    setLoggedIn(true);
    setLoggingIn(false);
    axios.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
  
    setTimeout(handleRefreshToken, JwtExpiryTime - 2000);
  };

  const handleLoginFail = () => {
    setLoggingIn(false);
    setLoggedIn(false);
    axios.defaults.headers.common['Authorization'] = undefined;
  };

  return {
    isLoggedIn, isLoggingIn, login, register, handleRefreshToken
  }
};
