import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: "https://infinitychat-od5i.onrender.com/api",
    // baseURL: "http://localhost:5000/api",
    withCredentials : true,
})

