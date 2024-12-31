import axios from "axios"
import axiosInstance from "../../api/axiosInstance"

const login = async (credentials) => {
    const response = await axiosInstance.post(`/api/login`, credentials);
    return response.data;
}

const register = async (credentials) => {
    const response = await axiosInstance.post("api/register", credentials);
    return response.data;
}

const socialLogin = async (credentials) => {
    const response = await axiosInstance.post(`api/socialLogin`, credentials);
    return response.data;
}

export default {login, register, socialLogin};