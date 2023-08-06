import axios from 'axios';
import Cookies from 'js-cookie';

const axiosInstance = axios.create();

axiosInstance.interceptors.request.use(async (config) => {
  const jwtToken = Cookies.get('jwt')
  config.headers.Authorization = `Bearer ${jwtToken}`;
  return config;
});

export default axiosInstance;
