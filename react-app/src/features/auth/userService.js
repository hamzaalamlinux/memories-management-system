import axios from "axios"
import axiosInstance from "../../api/axiosInstance"

const login = async (credentials) => {
    const response = await axiosInstance.post(`/api/login`, credentials);
    return response.data;
}

const register = async (credentials) => {
    const response = await axiosInstance.post("api/register", credentials);
}

export default {login, register};