// import axios from "axios";

// // const baseURL= `${import.meta.env.VITE_REACT_CLIENT_URL}`
// // const baseURL = import.meta.env.VITE_REACT_CLIENT_URL;

// const instance = axios.create();

// export const apiGet=(url:string)=>instance({
//         method : "get",
//         url :url,
// })
// export const apiGetWithBody=(url:string,data:any)=>instance({
//     method : "get",
//     url : url,
//     data,
// })
// export const apiPOST=(url:string,data:any)=>instance({
//     method : "post",
//     url : url,
//     data,
// })

// export const apiPut=(url:string,data:any)=>instance({
//     method : "put",
//     url : url,
//     data,
// })
// export const apiDlete=(url:string)=>instance({
//     method:"delete",
//     url:url
// })

import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

// Define the base URL from environment variables
const baseURL = import.meta.env.VITE_API_URL;

// Create an Axios instance with default configurations
const instance: AxiosInstance = axios.create({
  baseURL,
  timeout: 30000,
  headers: {
    Accept: 'application/json',
  },
});
instance.interceptors.response.use(
  response => response,
  error => {
    if (error.response && error.response.status === 404) {
      // Handle 404 errors
      console.error('Resource not found:', error.config.url);
    }
    return Promise.reject(error);
  }
);

// Request interceptor to add authorization tokens or modify requests
instance.interceptors.request.use(
  (config: any) => {
    const token = localStorage.getItem('token'); // Retrieve token from local storage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    // Handle request errors
    return Promise.reject(error);
  }
);

// Response interceptor to handle responses globally
instance.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error) => {
    // Handle response errors
    if (error.response) {
      // Server responded with a status other than 2xx
      console.error('API error:', error.response.data);
    } else if (error.request) {
      // Request was made but no response received
      console.error('Network error:', error.message);
    } else {
      // Something else caused the error
      console.error('Error:', error.message);
    }
    return Promise.reject(error);
  }
);

// Define API methods
export const apiGet = (url: string, config?: AxiosRequestConfig) =>
  instance.get(url, config);

export const apiPost = (url: string, data: any, config?: AxiosRequestConfig) =>
  instance.post(url, data, config);

export const apiPut = (url: string, data: any, config?: AxiosRequestConfig) =>
  instance.put(url, data, config);

export const apiDelete = (url: string, config?: AxiosRequestConfig) =>
  instance.delete(url, config);
