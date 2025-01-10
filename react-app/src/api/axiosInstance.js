import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { refreshToken } from "../features/auth/userSlice";
import { useEffect } from "react";

const axiosInstance = axios.create({
    baseURL: "http://145.223.85.15:9000",
});

export const setupAxiosInterceptors = (token, dispatch, navigate) => {
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

    axiosInstance.interceptors.response.use(
        (response) => response,
        async (error) => {
            if (error.response && error.response.status === 401) {
                const refreshPayload = {
                    token: token
                };

                // Use dispatch here
                dispatch(refreshToken(refreshPayload));

                const originalRequest = error.config;
                if (!originalRequest._retry) {
                    originalRequest._retry = true;
                    try {
                        return axiosInstance(originalRequest);
                    } catch (retryError) {
                        console.log(retryError);
                    }
                }
            }

            // Use navigate here
            // navigate("/logout");
        }
    );
};



export default axiosInstance;
