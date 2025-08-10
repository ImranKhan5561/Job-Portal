import axios, { InternalAxiosRequestConfig } from "axios";


const axiosInstance = axios.create({
  baseURL: "http://localhost:8080",
});

// Request Interceptor
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

 
 export const setupResponseInterceptor = (navigate: any) => {
  axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        
        localStorage.removeItem('token');
        localStorage.removeItem('user');

        
       
          navigate("/login");
      

        return Promise.reject(error);
      }
      return Promise.reject(error);
    }
  );
};

export default axiosInstance