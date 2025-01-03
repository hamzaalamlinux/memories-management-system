import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { refreshToken } from "../features/auth/userSlice";

const axiosInstance = axios.create({
    baseURL: "http://127.0.0.1:8000",
   
});

export const setupAxiosInterceptors = (token) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
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
            if(error.response && error.response.status == 401){
                const redresh = {
                    token : token
                };
                dispatch(refreshToken(redresh))
                const orignalRequest = error.config;
                if(!orignalRequest._retry){
                    orignalRequest._retry = true;
                    try{
                        return axiosInstance(orignalRequest);
                    }catch(retryError){
                        console.log(retryError);
                    }       

                }
            }

              navigate("/logout");
        }
    )
};


export default axiosInstance;
