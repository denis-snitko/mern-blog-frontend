import axios from 'axios';

const { REACT_APP_API, REACT_APP_API_PREFIX } = process.env;

console.log(`${REACT_APP_API}${REACT_APP_API_PREFIX}`);

const instance = axios.create({
  baseURL: `${REACT_APP_API}${REACT_APP_API_PREFIX}`,
})

instance.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${window.localStorage.getItem('token')}`;
  
  return config;
})

export default instance;