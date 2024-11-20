import axios from "axios";

const api = axios.create({
    baseURL: "http://67.202.46.10:8080"
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