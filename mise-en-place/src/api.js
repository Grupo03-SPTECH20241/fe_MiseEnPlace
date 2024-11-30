import axios from "axios";

const api = axios.create({
  baseURL: "http://10.0.0.156:8080"
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');

    if (token && config.url !== '/usuarios') {
      console.log(config.url);
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;