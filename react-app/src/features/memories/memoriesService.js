import axiosInstance from "../../api/axiosInstance"

const addMemories =  async (request) => {
 const response = await axiosInstance.post(`api/memories/store`, request);
 return response.data;
}


const fetchMemories = async () => {
    const response = await axiosInstance.get(`api/memories/reterive-memories`);
    return response.data;
}

const deleteMemories = (Id) => {
    const response =  axiosInstance.delete(`api/memories/delete-memories/${Id}`);
    return response.data;

}

export default {addMemories, fetchMemories, deleteMemories};