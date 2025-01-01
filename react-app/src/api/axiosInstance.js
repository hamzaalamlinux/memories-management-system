import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "http://127.0.0.1:8000",
   
});

export const setupAxiosInterceptors = (token) => {
    axiosInstance.interceptors.request.use(
        (config) => {
            console.log(token);
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        },
        (error) => Promise.reject(error)
    );
};

export default axiosInstance;
