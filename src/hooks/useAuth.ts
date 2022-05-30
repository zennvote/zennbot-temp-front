import axios, { AxiosResponse } from "axios";

const JwtExpiryTime = 10 * 1000;

export const login = async (username: string, password: string) => {
  const data = { username, password };
  console.log(axios.defaults.baseURL);
  const response = await axios.post('/auth/login', data);

  handleLoginSuccess(response);
};

export const handleRefreshToken = async () => {
  try {
    const response = await axios.post('/auth/refresh');
    handleLoginSuccess(response);
  } catch {
    axios.defaults.headers.common['Authorization'] = undefined;
  }
};

const handleLoginSuccess = (response: AxiosResponse) => {
  const { access_token } = response.data;

  axios.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;

  setTimeout(handleRefreshToken, JwtExpiryTime - 5000);
};
