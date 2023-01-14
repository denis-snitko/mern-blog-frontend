import axios from 'axios';

const { REACT_APP_API } = process.env;

const instance = axios.create({
  baseURL: REACT_APP_API,
})

instance.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${window.localStorage.getItem('token')}`;
  
  return config;
})

export default instance;