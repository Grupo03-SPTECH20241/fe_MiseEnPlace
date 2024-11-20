import axios from "axios";

const api = axios.create({
    baseURL: "http://54.164.31.102:8080"
});

api.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('token');
  
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
      
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
);

export default api;